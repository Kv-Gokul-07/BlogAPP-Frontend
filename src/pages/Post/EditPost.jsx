import React, { useEffect, useState } from 'react';

import { Field, Form, Formik } from 'formik';
import { Input, notification } from 'antd';
import 'react-quill/dist/quill.snow.css';

import CustomButton from '../../component/common/Button/CustomButton'
import FormInput from '../../component/common/Input/Input'
import Layout from '../../component/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '../../Editor';

const EditPost = () => {

    const [postInfo, setPostInfo] = useState();
    const [content, setContent] = useState();
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    console.log(postInfo?.title, String(postInfo?.title))

    useEffect(() => {
        fetch(`https://blog-backend-d16l.onrender.com/home/post/${id}`).then((response) => {
          response.json().then((postInfo) => {
            setPostInfo(postInfo?.postDoc);
            setContent(postInfo?.postDoc?.content);
            setFile(postInfo?.postDoc?.cover)
          });
        });
      }, []);

  return (
    <Layout>
     <main>
    <Formik
          initialValues={{ editTitle: postInfo?.title, editSummary: postInfo?.summary }}

          onSubmit={ async (values) => {
            const data = new FormData();
              data.set('title', postInfo?.title)
              data.set('summary', values.summary)
              data.set('content', content)
              data.set('id', postInfo?._id)

              if (file?.[0]) {
                data.set('file', file?.[0])
              }

            const response = await fetch('https://blog-backend-d16l.onrender.com/post', {
              method: 'PUT',
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
                  navigate(`/post/${id}`);
              });
            }
            
          }}
        >
          {(values) => (
            <Form className="form_field">
                <Field
                type="text"
                name="editTitle"
                placeholder="Title"
                component={FormInput}
                validation={values}
              />
              <Field
                type="text"
                name="editSummary"
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
                <Editor value={content} onChange={setContent} />
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

export default EditPost