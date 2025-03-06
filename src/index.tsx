import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react'; // Добавили useState
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps'; // Import ArticleStateType

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState); // Добавили state

  // Функция для обновления articleState
  const handleArticleStateChange = (newStates: ArticleStateType) => {
    setArticleState(newStates);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,  // Use articleState
          '--font-size': articleState.fontSizeOption.value,  // Use articleState
          '--font-color': articleState.fontColor.value,  // Use articleState
          '--container-width': articleState.contentWidth.value,  // Use articleState
          '--bg-color': articleState.backgroundColor.value,  // Use articleState
        } as CSSProperties
      }
    >
      <ArticleParamsForm setArticleState={handleArticleStateChange} />  {/* Передали setArticleState */}
      <Article articleState={articleState} />  {/* Передали articleState в Article (предполагаю) */}
    </main>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);