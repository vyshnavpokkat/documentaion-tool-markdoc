import { useContext } from 'react';
import { DataContext } from '../pages/_app';

interface ClickBoxProps {
  title: string;
  children: React.ReactNode;
  name:string;
}

export function ClickBox({ title, children,name }: ClickBoxProps) {
  const { isApiBoxHandle } = useContext(DataContext);

  const handleClick = () => {
    if (isApiBoxHandle) {
      isApiBoxHandle({name:title,value:true});
      console.log("name========>",title);
      
    }
  };

  return (
    <div className="callout" onClick={handleClick}>
      {/* <strong>{title}</strong> */}
      <span>{children}</span>
      <style jsx>
        {`
          .callout {
            display: flex;
            flex-direction: column;
            padding: 12px 16px;
            background: #f6f9fc;
            border-left: 5px solid #dce6e9;
            border-radius: 4px;
            cursor: pointer;
          }
          .callout :global(p) {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}
