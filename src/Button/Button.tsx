import React, { useState } from 'react';
import css from './button.module.css';

export const Button = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={css.instrukciaContainer}>
                <button className={css.instrukcia} onClick={openModal}>
                    Подробнее
                </button>
            </div>

            {isModalOpen && (
                <div className={css.okno}>
                    <div className={css.oknoContent}>
            <span className={css.oknoClose} onClick={closeModal}>
              &times;
            </span>
                        <p className={css.oknoText}>
                            <span>💸🛬</span> - ОПЛАЧЕНО - Ваши деньги приземлились.
                            <br />
                            <br />
                            <span>🕛⏳📦</span> - ЗАКАЗ ПЕРЕДАН НА СБОРКУ...
                            <br />
                            <br />
                            <span>👷‍♂️👷‍♀️📦</span> - ЗАКАЗ СОБИРАЕТСЯ...
                            <br />
                            <br />
                            <span>📦✅</span> - ЗАКАЗ СОБРАН - Ваш заказ уже собран и готовится к отгрузке.
                            <br />
                            <br />
                            <span>🚚📦🌍✅😊📍🚛📍</span> - ОТГРУЖЕНО В ТК - Ваш заказ уехал в Транспортную Компанию.
                            <br />
                            <br />
                            <span>📞</span> - ЗАКАЗ НЕ НАЙДЕН - Если в течение 3-х рабочих дней после оплаты у заказа нет статуса "ОПЛАЧЕНО", <br />
                            то отправьте свой чек и номер заказа на ватсап:{' '}
                            <a href="https://wa.me/79183761821" target="_blank" rel="noopener noreferrer">
                                +79183761821
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
