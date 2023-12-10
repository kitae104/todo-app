import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import { retriveTodoApi, updateTodoApi, createTodoApi } from './api/TodoApiService';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';

export default function TodoComponent() {
  const {id} = useParams();               // URL 경로에서 파라미터 값을 가져온다.

  const [description, setDescription] = useState('')  // description 상태값을 정의한다.
  const [targetDate, setTargetDate] = useState('')    // targetDate 상태값을 정의한다.

  const authContext = useAuth();          // useAuth() 훅을 사용하여, AuthContext 객체를 가져온다.
  const navigate = useNavigate();

  const username = authContext.username;  // AuthContext 객체에서 사용자 이름을 가져온다.

  useEffect(
    () => retriveTodos(), [id]            // [id] id가 변경될 때마다 실행 
  );

  function retriveTodos(){

    if(id !== -1){
      retriveTodoApi(username, id)        // id에 해당하는 할 일 목록을 가져온다.
      .then(response => {
        setDescription(response.data.description);  // description 상태값을 변경한다.
        setTargetDate(response.data.targetDate);    // targetDate 상태값을 변경한다.
      })
      .catch(error => console.log(error));    
    }

  }

  function onSubmit(values) {
    console.log(values);
    // todo 객체를 생성한다.
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false
    }
    console.log(todo);
    if(id === -1) {
      createTodoApi(username, todo)
      .then(response => {
        navigate('/todos');               // 할 일 목록 화면으로 이동한다.
      })
      .catch(error => console.log(error));
    } else {
      updateTodoApi(username, id, todo)
      .then(response => {
        navigate('/todos');               // 할 일 목록 화면으로 이동한다.
      })    
      .catch(error => console.log(error));
    }
  }

  function validate(values) { 
    let error = {
      //description: 'Enter a valid description',
      //targetDate: 'Enter a valid target date'
    }

    if(values.description.length < 5) {
      error.description = 'Enter at least 5 Characters in Description'
    }

    if(values.targetDate.length == null || moment(values.targetDate).isValid() || values.targetDate === '') {
      error.targetDate = 'Enter a target date'
    }

    console.log(values);
    return error;
  }

  return (
    <div className="container">
      <h1>할 일 목록 상세</h1>       
      <div>
        <Formik initialValues={{description, targetDate}}
          enableReinitialize={true} // enableReinitialize={true}를 설정하여, 초기값을 변경할 수 있도록 한다.
          onSubmit = {onSubmit}
          validate = {validate}
          validateOnChange = {false} // validateOnChange={false}를 설정하여, 값이 변경될 때마다 유효성 검사를 하지 않도록 한다.
          validateOnBlur = {false}   // validateOnBlur={false}를 설정하여, 포커스가 빠져나갈 때마다 유효성 검사를 하지 않도록 한다.
        >
          {
            (props) => (
              <Form>
                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                <fieldset className='form-group'>
                  <label>Description</label>
                  <Field type="text" className="form-control" name="description" />
                </fieldset>
                <fieldset className='form-group'>
                  <label>Target Date</label>
                  <Field type="date" format="MM/dd/yyyy" className="form-control" name="targetDate" />
                </fieldset>
                <div>
                  <button className="btn btn-success m-5" type="submit">Save</button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  );
}