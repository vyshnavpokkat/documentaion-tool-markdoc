import React, { createContext, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { TableOfContents, TopNav } from '../components';
import 'prismjs';
import 'prismjs/components/prism-bash.min';
import 'prismjs/themes/prism.css';
import '../public/globals.css'
import type { AppProps } from 'next/app'
import type { MarkdocNextJsPageProps } from '@markdoc/next.js'
import Markdoc from '@markdoc/markdoc';

export const DataContext = createContext(null);


const TITLE = 'Markdoc';
const DESCRIPTION = 'A powerful, flexible, Markdown-based authoring framework';


function collectHeadings(node, sections = []) {


  if (node) {
    if (node.name === 'Heading') {
      const title = node.children[0];

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title
        });
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections);
      }
    }
  }

  return sections;
}

export type MyAppProps = MarkdocNextJsPageProps

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const { markdoc } = pageProps;
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [apiboxHandle, isApiBoxHandle] = useState({ value: false, name: "doc1" });

  useEffect(() => {
    const slug = window.location.hash.substr(1); // Get the fragment identifier

    fetch(`/api/${apiboxHandle.name}`)
      .then(response => response.json())
      .then(data => {
        setMarkdownContent(data.content);
      })
      .catch(error => console.error('Error fetching Markdown content:', error));

  }, [apiboxHandle]); // Empty dependency array ensures the effect runs only once on mount

  let title = TITLE;
  let description = DESCRIPTION;

  const config = {
    partials: {
      'handle.md': Markdoc.parse(markdownContent)
    }
  };

  const doc = `
    {% partial file="handle.md" /%}
  `;

  const ast = Markdoc.parse(doc);
  const content = Markdoc.transform(ast, config);
  const html = Markdoc.renderers.html(content);

  if (markdoc) {
    if (markdoc.frontmatter.title) {
      title = markdoc.frontmatter.title;
    }
    if (markdoc.frontmatter.description) {
      description = markdoc.frontmatter.description;
    }
  }

  const toc = pageProps.markdoc?.content ? collectHeadings(pageProps.markdoc.content) : [];

  return (
    <>
      <DataContext.Provider value={{ isApiBoxHandle }}>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="referrer" content="strict-origin" />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TopNav >
          <Link href="/docs">Docs</Link>
        </TopNav>
        <div className="flex">
          <div className="flex-none w-2/12">
            <TableOfContents toc={toc} />
          </div>
          <div className="flex-initial p-4 lvh overflow-auto mx-auto">
            <div className="flex-none relative outline-none mt-[-1px] flex flex-col">
              <Component {...pageProps} />
            </div>
          </div>
          {apiboxHandle?.value &&
            <div className="flex-initial w-6/12 p-4 lvh overflow-auto bg-custom-mediumGray text-gray-200">
              <button onClick={() => isApiBoxHandle(prevState => ({ ...prevState, value: false }))} type="button" className=" bg-transparent rounded-lg p-2 inline-flex items-center justify-center text-gray-400 border border-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex-none relative outline-none mt-[-1px] flex flex-col">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>
          }
        </div>
      </DataContext.Provider>
    </>
  );
}
