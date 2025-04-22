import React from 'react';

// Props to customize how the icons are rendered
interface BuffaloIconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const BuffaloFace: React.FC<BuffaloIconProps> = ({
  size = 40,
  color = '#8B4513',
  style,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <circle cx="50" cy="50" r="40" fill={color} />
      {/* Horns */}
      <path
        d="M20 30C15 25 5 25 5 15C5 10 10 5 20 10C25 12 25 20 25 25"
        fill="#5D4037"
      />
      <path
        d="M80 30C85 25 95 25 95 15C95 10 90 5 80 10C75 12 75 20 75 25"
        fill="#5D4037"
      />
      {/* Eyes */}
      <circle cx="35" cy="40" r="5" fill="white" />
      <circle cx="65" cy="40" r="5" fill="white" />
      <circle cx="35" cy="40" r="2" fill="black" />
      <circle cx="65" cy="40" r="2" fill="black" />
      {/* Nose */}
      <rect x="45" y="55" width="10" height="10" rx="5" fill="#5D4037" />
      {/* Mouth */}
      <path d="M40 65 C50 75, 60 65, 60 65" stroke="#5D4037" strokeWidth="2" />
    </svg>
  );
};

export const BuffaloFootprint: React.FC<BuffaloIconProps> = ({
  size = 30,
  color = '#8B4513',
  style,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <path
        d="M30 20C35 10 45 10 50 20C55 30 45 40 40 40C35 40 25 30 30 20Z"
        fill={color}
      />
      <path
        d="M60 20C65 10 75 10 80 20C85 30 75 40 70 40C65 40 55 30 60 20Z"
        fill={color}
      />
      <path
        d="M20 50C25 40 35 40 40 50C45 60 35 70 30 70C25 70 15 60 20 50Z"
        fill={color}
      />
      <path
        d="M70 50C75 40 85 40 90 50C95 60 85 70 80 70C75 70 65 60 70 50Z"
        fill={color}
      />
      <path
        d="M40 70C50 65 60 65 70 70C80 75 80 85 70 90C60 95 50 95 40 90C30 85 30 75 40 70Z"
        fill={color}
      />
    </svg>
  );
};

export const GrassTuft: React.FC<BuffaloIconProps> = ({
  size = 30,
  color = '#4CAF50',
  style,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <path
        d="M50 10C50 10 40 40 30 70C45 60 50 60 50 60C50 60 55 60 70 70C60 40 50 10 50 10Z"
        fill={color}
      />
      <path
        d="M30 20C30 20 40 50 45 80C40 70 35 70 35 70C35 70 25 75 15 90C25 60 30 20 30 20Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M70 20C70 20 60 50 55 80C60 70 65 70 65 70C65 70 75 75 85 90C75 60 70 20 70 20Z"
        fill={color}
        opacity="0.7"
      />
    </svg>
  );
};

export const BuffaloCloud: React.FC<BuffaloIconProps> = ({
  size = 60,
  color = '#FFFFFF',
  style,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <ellipse cx="30" cy="25" rx="20" ry="15" fill={color} />
      <ellipse cx="50" cy="20" rx="25" ry="20" fill={color} />
      <ellipse cx="70" cy="30" rx="20" ry="15" fill={color} />
      <ellipse cx="40" cy="35" rx="15" ry="10" fill={color} />
      <ellipse cx="60" cy="35" rx="15" ry="10" fill={color} />
    </svg>
  );
};

const BuffaloIcons = {
  BuffaloFace,
  BuffaloFootprint,
  GrassTuft,
  BuffaloCloud,
};

export default BuffaloIcons;
