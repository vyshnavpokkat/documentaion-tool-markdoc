import { useContext } from 'react';
import { DataContext } from '../pages/_app';
import { Router, useRouter } from 'next/router';

interface ClickBoxProps {
  title: string;
  children: React.ReactNode;
  name:string;
}

export function ClickBox({ title, children,name }: ClickBoxProps) {
  const { setApiBoxHandle } = useContext(DataContext);
  const router=useRouter()

  const handleClick = () => {
    if (setApiBoxHandle) {
      setApiBoxHandle({name:title,value:true});
      router.push(`/#${title}`)

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
            margin-top:10px;
          }
          .callout :global(p) {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}
