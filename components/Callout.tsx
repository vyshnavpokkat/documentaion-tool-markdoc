import * as React from 'react';

export function Callout({ title, children }) {
  return (
    <div className="callout mt-1">
      <strong>{title}</strong>
      <span>{children}</span>
      <style jsx>
        {`
          .callout {
            display: flex;
            flex-direction: column;
            padding: 12px 16px;
            background: #f6f9fc;
            border: 1px solid #dce6e9;
            border-radius: 4px;
            margin-top:1rem;
          }
          .callout :global(p) {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}
