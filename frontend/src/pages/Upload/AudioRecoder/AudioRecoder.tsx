import React, {useState, useRef, useEffect} from 'react';
import Header from "@/components/Header/Header.tsx";
import CancelButton from "@/components/Button/CancelButton.tsx";
import PauseIcon from "@/assets/imgs/Pause.svg";
import StopIcon from "@/assets/imgs/Stop.svg";
import MicIcon from "@/assets/imgs/Mic.svg";
import Body from "@/components/Body/Body.tsx";
import { useModal } from "@/contexts/ModalContext.tsx";

//
// interface AudioData {
//   dataArray: Float32Array;
//   analyser: AnalyserNode;
// }

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false); // 녹음 중 여부
  const [isPaused, setIsPaused] = useState(false); // 일시정지 여부
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]); // 녹음 데이터
  const [time, setTime] = useState(0); // 녹음 시간 (초 단위)
  const [audioURL, setAudioURL] = useState<string | null>(null); // 녹음된 오디오 URL
  const [audioData, setAudioData] = useState<number[]>([]);
  const { showModal } = useModal();


  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // MediaRecorder 참조
  const intervalRef = useRef<number | null>(null); // 타이머 참조
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  // mm:ss 형식으로 변환하는 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateAudioData = () => {
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      analyserRef.current.getFloatTimeDomainData(dataArray);

      // 파형 데이터를 시각화에 적합한 형태로 변환
      const normalizedData = Array.from(dataArray).map(value =>
        Math.abs(value) * 100
      );

      setAudioData(normalizedData);
      animationFrameRef.current = requestAnimationFrame(updateAudioData);
    }
  };
  // 녹음 시작 함수
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});

      // AudioContext 설정
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // MediaRecorder 설정
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      });

      // 녹음 시작
      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // 타이머 시작
      intervalRef.current = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);

      // 음성 파형 업데이트 시작
      updateAudioData();

    } catch (error) {
      console.error('Error starting recording:', error);
      showModal('마이크 접근 권한이 필요합니다.', () => {});
    }
  };

  // 녹음 일시정지/재개 함수
  const toggleRecording = () => {
    if (isRecording && !isPaused) {
      // 일시정지할 때
      if (mediaRecorderRef.current?.state === "recording") {
        try {
          mediaRecorderRef.current?.pause();
          // 타이머 정지
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;  // null로 설정
          }
          cancelAnimationFrame(animationFrameRef.current!);
          setIsPaused(true);
          setIsRecording(false);
        } catch (error) {
          console.error('Error pausing recording:', error);
        }
      }
    } else {
      // 녹음 시작 또는 재개할 때
      if (isPaused && mediaRecorderRef.current?.state === "paused") {
        try {
          mediaRecorderRef.current?.resume();
          // 타이머 재시작
          if (!intervalRef.current) {  // interval이 없을 때만 새로 시작
            intervalRef.current = window.setInterval(() => {
              setTime(prev => prev + 1);
            }, 1000);
          }
          updateAudioData();
          setIsPaused(false);
          setIsRecording(true);
        } catch (error) {
          console.error('Error resuming recording:', error);
        }
      } else {
        startRecording();
      }
    }
  };

  // 녹음 정지 함수
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      clearInterval(intervalRef.current!);
      cancelAnimationFrame(animationFrameRef.current!);

      // 스트림 정리
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());

      // AudioContext 정리
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      setIsRecording(false);
      setIsPaused(false);

      // 녹음 데이터 저장
      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, {type: 'audio/webm'});
        setAudioURL(URL.createObjectURL(blob));
      }
    }
  };

  // 컴포넌트 마운트 시 자동 녹음 시작
  useEffect(() => {
    startRecording();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      stopRecording();
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, []);


  return (
    <div style={styles.container}>
      <Header
        title="실시간 녹음"
        leftButton={<CancelButton/>}
        rightButton={
          <div className="relative p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        }
      />
      <Body>
        {isPaused && (
          <div style={styles.pauseStatus}>
            일시정지
          </div>
        )}

        {/* 음성 파형 */}
        <div style={styles.waveform}>
          {audioData.map((value, index) => (
            <div
              key={index}
              style={{
                width: '2px',
                height: `${value}px`,
                backgroundColor: '#6b7280',
                margin: '0 1px',
                transition: 'height 0.05s ease'
              }}
            />
          ))}
        </div>

        {/* 타이머와 안내 텍스트 영역 */}
        <div style={styles.timerContainer}>
          <div style={styles.timer}>{formatTime(time)}</div>
          <p style={styles.infoText}>
            녹음 전에 상대방의 동의를 구하는 에티켓을 지켜주세요.
          </p>
        </div>

        {/* 컨트롤 버튼 */}
        <div style={styles.controls}>
          <button onClick={toggleRecording} style={styles.pauseButton}>
            <img
              src={isPaused ? MicIcon : PauseIcon}
              alt={isPaused ? "Record" : "Pause"}
              className="w-10 h-10"
            />
          </button>
          <button onClick={stopRecording} style={styles.stopButton}>
            <img src={StopIcon} alt="Stop" className="w-10 h-10"/>
          </button>
        </div>
      </Body>
    </div>
  );
};

// 스타일 수정
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
  },
  pauseStatus: {
    fontSize: '14px',
    color: '#000',
    backgroundColor: '#fff',
    padding: '8px 20px',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    marginTop: '20px',
  },
  waveform: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '300px', // 고정 높이 설정
    position: 'fixed' as const,
    top: '50%', // 화면 중앙
    transform: 'translateY(-50%)', // 정확한 중앙 정렬
    padding: '0 20px',
    left: 0,
    right: 0,
  },
  timerContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    marginTop: 'auto',
    marginBottom: '150px',
  },
  timer: {
    fontSize: '20px',
    textAlign: 'center' as const,
  },
  infoText: {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center' as const,
  },
  controls: {
    position: 'fixed' as const,
    bottom: '20px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px',
  },
  pauseButton: {
    position: 'absolute' as const,
    left: '50%',
    bottom: '50px',
    transform: 'translateX(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
  },
  stopButton: {
    position: 'absolute' as const,
    right: '60px',
    bottom: '50px',
    backgroundColor: 'transparent',
    border: 'none',
  },
};

export default AudioRecorder;