import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const UiverseButton = ({ children, onClick, className = '', href, type = 'button', icon, download = false }) => {
  const content = (
    <div className="button-outer">
      <div className="button-inner">
        <span className="button-content">
          {icon && <Icon className="button-icon h-4 w-4 shrink-0" name={icon} />}
          <span className="button-text">{children}</span>
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <StyledWrapper className={className}>
        <a href={href} className="button" {...(download ? { download: true } : {})}>
          {content}
        </a>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper className={className}>
      <button type={type} className="button" onClick={onClick}>
        {content}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .button {
    all: unset;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    border-radius: 100em;
    background-color: #d1d1d1;
    display: inline-flex;
    box-shadow:
      -0.15em -0.15em 0.15em -0.075em rgba(240, 240, 240, 0.8),
      0.05em 0.05em 0.1em 0 rgba(140, 140, 140, 0.4);
  }

  .button::after {
    content: "";
    position: absolute;
    z-index: 0;
    width: calc(100% + 0.3em);
    height: calc(100% + 0.3em);
    top: -0.15em;
    left: -0.15em;
    border-radius: inherit;
    background: linear-gradient(
      -135deg,
      rgba(160, 160, 160, 0.4),
      transparent 20%,
      transparent 100%
    );
    filter: blur(0.0125em);
    opacity: 0.3;
    mix-blend-mode: multiply;
  }

  .button .button-outer {
    position: relative;
    z-index: 1;
    border-radius: inherit;
    transition: box-shadow 300ms ease, transform 200ms ease;
    will-change: box-shadow, transform;
    box-shadow:
      0 0.05em 0.05em -0.01em rgba(160, 160, 160, 0.8),
      0 0.01em 0.01em -0.01em rgba(160, 160, 160, 0.5),
      0.15em 0.3em 0.1em -0.01em rgba(160, 160, 160, 0.25);
  }

  .button:hover .button-outer {
    box-shadow:
      0 0 0 0 rgba(160, 160, 160, 0.8),
      0 0 0 0 rgba(160, 160, 160, 0.5),
      0 0 0 0 rgba(160, 160, 160, 0.25);
  }

  .button-inner {
    --inset: 0.035em;
    position: relative;
    z-index: 1;
    border-radius: inherit;
    padding: 0.625em 1.25em;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-image: linear-gradient(
      135deg,
      #f5f5f5,
      #e0e0e0
    );
    transition:
      box-shadow 300ms ease,
      clip-path 250ms ease,
      background-image 250ms ease,
      transform 250ms ease;
    will-change: box-shadow, clip-path, background-image, transform;
    overflow: clip;
    clip-path: inset(0 0 0 0 round 100em);
    box-shadow:
      0 0 0 0 inset rgba(160, 160, 160, 0.1),
      -0.05em -0.05em 0.05em 0 inset rgba(160, 160, 160, 0.25),
      0 0 0 0 inset rgba(160, 160, 160, 0.1),
      0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.5),
      0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1),
      0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.5),
      -0.075em -0.25em 0.25em 0.1em inset rgba(160, 160, 160, 0.25);
  }

  .button:hover .button-inner {
    clip-path: inset(
      clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px) round 100em
    );
    box-shadow:
      0.1em 0.15em 0.05em 0 inset rgba(160, 160, 160, 0.7),
      -0.025em -0.03em 0.05em 0.025em inset rgba(160, 160, 160, 0.5),
      0.25em 0.25em 0.2em 0 inset rgba(160, 160, 160, 0.4),
      0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.3),
      0 0 0 0 inset rgba(255, 255, 255, 1),
      0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.5),
      -0.075em -0.12em 0.2em 0.1em inset rgba(160, 160, 160, 0.25);
  }

  .button-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    z-index: 4;
  }

  .button-text {
    font-family: "Inter", sans-serif;
    letter-spacing: -0.01em;
    font-weight: 500;
    font-size: 13px;
    color: #4A4A4A;
    transition: transform 250ms ease, color 250ms ease;
    display: block;
    will-change: transform;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
  }

  .button-icon {
    color: #8A8A8A;
    transition: transform 250ms ease, color 250ms ease;
  }

  .button:hover .button-text,
  .button:hover .button-icon {
    color: #333333;
  }

  .button:active .button-outer {
    transform: scale(0.96);
  }

  .button:active .button-text,
  .button:active .button-icon {
    color: #333333;
  }
`;

export default UiverseButton;
