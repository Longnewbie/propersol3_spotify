interface AudioWaveProps {
  color: string;
}

const AudioWave = ({ color }: AudioWaveProps) => (
  <div className="flex items-center justify-center gap-0.5 h-4">
    <div
      className={`w-0.5 ${color} rounded-full animate-wave-1`}
      style={{ height: "4px" }}
    />
    <div
      className={`w-0.5 ${color} rounded-full animate-wave-2`}
      style={{ height: "8px" }}
    />
    <div
      className={`w-0.5 ${color} rounded-full animate-wave-3`}
      style={{ height: "12px" }}
    />
    <div
      className={`w-0.5 ${color} rounded-full animate-wave-2`}
      style={{ height: "8px" }}
    />

    <style>{`
      @keyframes wave1 {
        0%,
        100% {
          height: 4px;
        }
        50% {
          height: 12px;
        }
      }
      @keyframes wave2 {
        0%,
        100% {
          height: 8px;
        }
        50% {
          height: 16px;
        }
      }
      @keyframes wave3 {
        0%,
        100% {
          height: 12px;
        }
        50% {
          height: 4px;
        }
      }
      .animate-wave-1 {
        animation: wave1 0.8s ease-in-out infinite;
      }
      .animate-wave-2 {
        animation: wave2 0.8s ease-in-out infinite 0.2s;
      }
      .animate-wave-3 {
        animation: wave3 0.8s ease-in-out infinite 0.4s;
      }
    `}</style>
  </div>
);

export default AudioWave;
