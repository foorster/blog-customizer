import { useState, FormEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

interface ArticleStateProps {
	setArticleState: (states: ArticleStateType) => void; // Функция для обновления состояния
}

export const ArticleParamsForm: React.FC<ArticleStateProps> = ({
	setArticleState,
}) => {
	const [setIsOpen, setOpen] = useState(false); // Состояние, определяющее, открыт ли сайдбар с настройками
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState); //Состояние формы, содержащее текущие значения параметров статьи

	const asideRef = useRef<HTMLElement>(null); // Ссылка на aside

	interface FormValues {
		fontFamilyOption: OptionType;
		fontSizeOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
	}

	const formChange =
		<K extends keyof FormValues>(formParameter: K) =>
		(value: FormValues[K]) => {
			setFormState((prevState) => ({ ...prevState, [formParameter]: value }));
		};

	const formReset = () => {
		setFormState(defaultArticleState); // Функция для сброса состояния формы к значениям по умолчанию
		setArticleState(defaultArticleState); // Применяем дефолтные стили сразу после сброса
	};

	const formSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(formState); // Обновляем состояние статьи с использованием значений из формы
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setOpen(false); // Закрываем сайдбар
		}
	};

	useEffect(() => {
		if (!setIsOpen) {
			return;
		}
		const handleMouseDown = (event: MouseEvent) => {
			handleClickOutside(event);
		};
		document.addEventListener('mousedown', handleMouseDown);
		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, [setIsOpen]);

	return (
		<>
			<ArrowButton
				isOpen={setIsOpen}
				onClick={() => setOpen((prev) => !prev)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: setIsOpen,
				})}
				ref={asideRef}>
				<form className={styles.form} onSubmit={formSubmit} onReset={formReset}>
					<h2 className={styles.formTitle}>Задайте параметры</h2>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={formChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={formState.fontSizeOption.title}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={formChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={formChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={formChange('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={formChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
