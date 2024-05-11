import React, { createContext, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { SideNav, TableOfContents, TopNav } from '../components';
import 'prismjs';
import 'prismjs/components/prism-bash.min';
import 'prismjs/themes/prism.css';
import '../public/globals.css'
import type { AppProps } from 'next/app'
import type { MarkdocNextJsPageProps } from '@markdoc/next.js'

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
  const [markdownContent1, setMarkdownContent1] = useState<string>('');
  const [apiboxHandle, isApiBoxHandle] = useState({ value: false, name: "docs1" })


  useEffect(() => {
    fetch(`/api/${apiboxHandle.name}`)
      .then(response => response.json())
      .then(data => {
        setMarkdownContent1(data.content);
        // setLoading(false);
      })
      .catch(error => console.error('Error fetching Markdown content:', error));
  }, [apiboxHandle.name]);


  let title = TITLE;
  let description = DESCRIPTION;
  if (markdoc) {
    if (markdoc.frontmatter.title) {
      title = markdoc.frontmatter.title;
    }
    if (markdoc.frontmatter.description) {
      description = markdoc.frontmatter.description;
    }
  }

  const toc = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : [];

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
        <TopNav>
          <Link href="/docs">Docs</Link>
        </TopNav>

        <div className="page">
          <TableOfContents toc={toc} />
          <main className="flex column">
            <div className="left-component">
              <div className="scrollable-content">
                <Component {...pageProps} />
              </div>
            </div>
            {apiboxHandle.value &&
              <div className="right-component">
                <div className="scrollable-content" style={{ backgroundColor: '#ddd', padding: "15px" }}>
                  <ReactMarkdown>{markdownContent1}</ReactMarkdown>
                </div>
              </div>
            }
          </main>
        </div>

        <style jsx>
          {`
      .page {
        position: fixed; 
        top: var(--top-nav-height);
        display: flex;
        width: 100vw;
        flex-grow: 1;
      }
      main {
        display: flex;
        justify-content:center;
        overflow: hidden;
        height: calc(100vh - var(--top-nav-height));
        flex-grow: 1;
        font-size: 16px;
        padding: 0 2rem 2rem;
      }
      .scrollable-content {
        overflow-y: auto;
        height: 100%;
        flex-grow: 1;
        padding-right: 10px; /* Adjust as needed to avoid content being hidden behind scrollbar */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
      }
      .left-component, .right-component {
        width: 50%; /* Adjust as needed */
        margin:10px;
      }
    `}
        </style>
      </DataContext.Provider>

    </>
  );
}
