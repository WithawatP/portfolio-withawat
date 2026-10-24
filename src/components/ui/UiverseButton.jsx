import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const UiverseButton = ({ children, onClick, className = '', href, type = 'button', icon, download = false }) => {
  if (href) {
    return (
      <StyledWrapper className={className}>
        <a href={href} className="button" {...(download ? { download: true } : {})}>
          <div className="button-outer">
            <div className="button-inner">
              <span className="button-content">
                {icon && <Icon name={icon} className="button-icon h-4 w-4" />}
                <span>{children}</span>
              </span>
            </div>
          </div>
        </a>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper className={className}>
      <button type={type} className="button" onClick={onClick}>
        <div className="button-outer">
          <div className="button-inner">
            <span className="button-content">
              {icon && <Icon name={icon} className="button-icon h-4 w-4" />}
              <span>{children}</span>
            </span>
          </div>
        </div>
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
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: #E7E7E7 !important;
    border-radius: 100em;
    padding: 0.625em 1.25em;

    box-shadow: 4px 4px 10px #b6b6b6, -4px -4px 10px #ffffff !important;
    transition: box-shadow 0.2s ease, transform 0.1s ease !important;
  }

  .button:hover {
    box-shadow: inset 3px 3px 8px #b6b6b6, inset -3px -3px 8px #ffffff !important;
    transform: translateY(1px) !important;
  }

  .button:active {
    box-shadow: inset 6px 6px 14px #909090, inset -6px -6px 14px #ffffff !important;
    transform: translateY(2px) scale(0.98) !important;
  }

  .button-outer,
  .button-inner {
    display: contents;
  }

  .button-content {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.625rem !important;
    line-height: 1 !important;
    white-space: nowrap;
  }

  .button-content span {
    color: #4A4A4A !important;
    font-family: "Inter", sans-serif;
    font-weight: 500 !important;
    font-size: 13px;
    line-height: 1 !important;
    transition: color 0.2s ease !important;
  }

  .button-icon {
    display: inline-block !important;
    flex-shrink: 0 !important;
    color: #8A8A8A !important;
    transition: color 0.2s ease !important;
  }

  .button:hover .button-icon,
  .button:hover .button-content span {
    color: #333333 !important;
  }

  .button:active .button-icon,
  .button:active .button-content span {
    color: #333333 !important;
  }
`;

export default UiverseButton;
