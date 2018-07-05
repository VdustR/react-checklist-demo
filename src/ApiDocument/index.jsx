import React from 'react';
import ReactMarkdown from 'react-markdown';
import apiMd from 'Src/api.md';
import style from './style.less';

const ApiDocument = () => (
  <div className={style.api}>
    <ReactMarkdown source={apiMd} />
  </div>
);

export default ApiDocument;
