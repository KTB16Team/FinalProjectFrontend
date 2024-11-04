import AlarmLogo from '../../assets/imgs/Alarm.svg?react';

export default function BellButton() {
  return (
    <button className="p-2 relative">
      <AlarmLogo/>
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  );
}