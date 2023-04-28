import React, { useState } from 'react';

import { Field, Form, Formik } from 'formik';
import { Input, notification } from 'antd';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import CustomButton from '../../component/common/Button/CustomButton'
import FormInput from '../../component/common/Input/Input'
import Layout from '../../component/Layout/Layout'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [content, setContent] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
   <Layout>
    <main>
    <Formik
          initialValues={{ title: "", summary: "" }}
        //   validationSchema={LoginSchema}
          onSubmit={ async (values) => {
            const data = new FormData();
              data.set('title', values.title)
              data.set('summary', values.summary)
              data.set('file', file[0])
              data.set('content', content)

            const response = await fetch('https://blog-backend-d16l.onrender.com/post', {
              method: 'POST',
              credentials: 'include',
              body: data,
            })

            if(response.ok) {
              response.json().then((response) => {
                console.log(response)
                  notification.success({
                    message: "Success",
                    description: "Successfully Created Post",
                  });
                  navigate("/");
              });
            }
            
          }}
        >
          {(values) => (
            <Form className="form_field">
                <Field
                type="text"
                name="title"
                // adorment="unlock"
                placeholder="Title"
                component={FormInput}
                validation={values}
              />
              <Field
                type="text"
                name="summary"
                // adorment="unlock"
                placeholder="Summary"
                component={FormInput}
                validation={values}
              />
              <div style={{marginTop: "20px"}}>
                <Input 
                type="file"
                onChange={(e) => setFile(e.target.files) }
                />
              </div>
              <div style={{marginBottom: "20px", marginTop: "20px"}}>
                <ReactQuill   
                value={content} 
                modules={modules}
                formats={formats}
                onChange={newValue => setContent(newValue)}
                />
                </div>
              <CustomButton
                type="primary"
                disabled={!values?.isValid}
                name="Create Post"
                btnClass="btn_submit"
              />
            </Form>
          )}
        </Formik>
    </main>
   </Layout>
  )
}

export default CreatePost