"use client"

import React, { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const createMarkup = (markdownText: string) => {
    const rawMarkup = marked.parse(markdownText, {
      gfm: true,
      breaks: true,
      headerIds: false,
      mangle: false,
    }) as string;
    
    const cleanMarkup = typeof window !== 'undefined' ? DOMPurify.sanitize(rawMarkup) : rawMarkup;
    
    return { __html: cleanMarkup };
  };

  const processedMarkup = useMemo(() => createMarkup(text), [text]);

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-ul:my-2 prose-li:my-0 prose-strong:text-foreground"
      dangerouslySetInnerHTML={processedMarkup}
    />
  );
};

export default SimpleMarkdown; 