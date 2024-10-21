import React, { useState, useRef} from 'react';

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false); // 녹음 중 여부
  const [isPaused, setIsPaused] = useState(false); // 일시정지 여부
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]); // 녹음 데이터
  const [time, setTime] = useState(0); // 녹음 시간 (초 단위)
  const [audioURL, setAudioURL] = useState<string | null>(null); // 녹음된 오디오 URL
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // MediaRecorder 참조
  const intervalRef = useRef<number | null>(null); // 타이머 참조

  // mm:ss 형식으로 변환하는 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 녹음 시작 함수
  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('음성 녹음을 지원하지 않는 브라우저입니다.');
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorder.onstart = () => {
      setIsRecording(true);
      setIsPaused(false);
      setTime(0);
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000); // 1초마다 시간 업데이트
    };

    mediaRecorder.onstop = () => {
      setIsRecording(false);
      clearInterval(intervalRef.current!); // 타이머 정지
      setAudioURL(URL.createObjectURL(new Blob(recordedChunks, { type: 'audio/webm' }))); // 녹음된 파일 저장
    };

    mediaRecorder.start();
  };

  // 녹음 일시정지/재개 함수
  const pauseRecording = () => {
    if (isPaused) {
      mediaRecorderRef.current?.resume();
      setIsPaused(false);
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      mediaRecorderRef.current?.pause();
      setIsPaused(true);
      clearInterval(intervalRef.current!); // 타이머 정지
    }
  };

  // 녹음 정지 함수
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(intervalRef.current!); // 타이머 정지
  };

  // 저장 기능 (여기선 녹음 완료 후, URL로 저장된 파일을 재생)
  const saveRecording = () => {
    if (audioURL) {
      const link = document.createElement('a');
      link.href = audioURL;
      link.download = 'recording.webm';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={styles.container}>
      <h1>실시간 녹음</h1>
      <p>Recording Time: {formatTime(time)}</p>

      {/* 녹음/일시정지 버튼 */}
      {!isRecording && !audioURL ? (
        <button onClick={startRecording} style={styles.button}>
          Start Recording
        </button>
      ) : (
        <button onClick={pauseRecording} style={styles.button}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      )}

      {/* 녹음 중 정지 버튼 */}
      {isRecording && (
        <button onClick={stopRecording} style={styles.button}>
          Stop Recording
        </button>
      )}

      {/* 녹음이 완료되면 저장 버튼 */}
      {audioURL && (
        <div>
          <audio controls src={audioURL}></audio>
          <button onClick={saveRecording} style={styles.button}>
            Save Recording
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AudioRecorder;
