// AddTransactionForm.jsx
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Обязательное поле'),
    amount: Yup.number().min(1, 'Минимум 1').required('Введите сумму'),
    date: Yup.date().max(new Date(), 'Дата не может быть в будущем')
});

export default () => (
    <Formik
        initialValues={{ title: '', amount: '', date: new Date() }}
        onSubmit={(values, { resetForm }) => {
            dispatch({ type: 'ADD_TRANSACTION', payload: { ...values, id: Date.now() } });
            resetForm();
        }}
        validationSchema={validationSchema}
    >
        {({ setFieldValue, values }) => (
            <Form>
                <Field name="title" placeholder="Название чека" />
                <Field name="amount" type="number" placeholder="Сумма" />
                <DatePicker
                    selected={values.date}
                    onChange={date => setFieldValue('date', date)}
                    dateFormat="dd.MM.yyyy"
                />
                <button type="submit">Добавить</button>
            </Form>
        )}
    </Formik>
);
