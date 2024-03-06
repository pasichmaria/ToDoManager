import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import * as Yup from "yup"
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Typography,
} from "antd"
import TextArea from "antd/es/input/TextArea"

import {
  addTodo,
  RootState,
  setFilter,
  toggleTodo, VisibilityFilters,
} from "../redux"
import { buttonStyle, contentStyle, headerStyle, layoutStyle } from "../styles"

export const TodoPage = () : JSX.Element => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const visibilityFilter = useSelector((state: RootState) => state.todos.visibilityFilter)

  const [visible, setVisible] = React.useState(false)

  const filteredTodos = React.useMemo(() => {
    if (visibilityFilter === VisibilityFilters.completed) {
      return todos.filter((todo) => todo.completed)
    } else if (visibilityFilter === VisibilityFilters.active) {
      return todos.filter((todo) => !todo.completed)
    } else {
      return todos
    }
  }, [todos, visibilityFilter])

  const activeTodosCount = todos.filter(todo => !todo.completed).length
  const handleSubmit = (values: { text: string, name : string }, {resetForm}:{ resetForm: () => void} ) : void => {
    if (values.text.trim() !== '' && values.name.trim() !== '' ) {
      dispatch(addTodo(values.text, values.name))
      resetForm()
      setVisible(false)
    }
  }
  const { Header, Footer, Content } = Layout

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}/>
      <Content style={contentStyle}>
        <Row justify="center">
          <Modal
            style={{
              minHeight: '100%',
              lineHeight: '120px',
              top : 200,
              padding: 18,
              overflow: 'hidden',
            }}
            visible={visible}
            title="Create new todo"
            footer={null}
            onCancel={() => setVisible(false)}
          >
            <Formik
              initialValues={{ text: '', name: '' }}
              validationSchema={Yup.object().shape({
                text: Yup.string()
                  .required('Todo is required')
                  .max(255, 'Todo must be at most 360 characters'),
                name: Yup.string()
                  .required('Name is required')
                  .max(50, 'Name must be at most 50 characters'),
              })}
              onSubmit={handleSubmit}
            >
              {({ values, errors, handleChange, handleSubmit }) =>
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Form.Item
                    label="Name"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name}
                  >
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Enter the name of the todo"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Todo"
                    validateStatus={errors.text ? 'error' : ''}
                    help={errors.text}
                  >
                    <TextArea
                      name="text"
                      value={values.text}
                      onChange={handleChange}
                      placeholder="Enter the todo"
                      maxLength={360}
                    />

                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%'}}>
                                            Add Todo
                    </Button>
                  </Form.Item>
                </Form>
              }
            </Formik>
          </Modal>

        </Row>
        <Col>
          <Row justify="center">
            <Col xs={22} sm={20} lg={4}>
              <Button
                type="primary"
                style={{ marginTop: 20, width: '100%', height: 50}}
                onClick={() => setVisible(true)}
              >
                                Create new todo
              </Button>
            </Col>
            <Col sm={24}  lg={2}>
              <Badge count={activeTodosCount} style={{ backgroundColor: '#52c41a', marginRight: 10 }}>
                <Button
                  onClick={() => dispatch(setFilter(VisibilityFilters.active))}>
                                            Active
                </Button>
              </Badge>
            </Col>
            <Col xs={8} sm={24} lg={2}>
              <Button
                style={buttonStyle}
                onClick={() => dispatch(setFilter(VisibilityFilters.all))}
              >
                            Display All
              </Button>
            </Col>
            <Col sm={24} lg={2}>
              <Badge count={todos.length - activeTodosCount} style={{ backgroundColor: '#f5222d' }}>
                <Button
                  onClick={() => dispatch(setFilter(VisibilityFilters.completed))}>
                                    Completed
                </Button>
              </Badge>
            </Col>
          </Row>
        </Col>

        <Row gutter={[16, 16]} justify={"center"}>
          {filteredTodos.map((todo) =>
            <Col key={todo.id} xs={22}  lg={10}>
              <Card style={{
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                marginBottom: '16px',
                backgroundColor: todo.completed ? '#e8e8ea' : '',
              }} title={todo.name}
              onClick={() => dispatch(toggleTodo(todo.id))}>
                <Row gutter={[16, 16]} justify="start" align="middle">
                  <Col xs={2} sm={2} md={2} style={{ fontSize: 20,  marginRight : 10
                  }}>
                    {todo.completed ? '✅' : '🕒'}
                  </Col>
                  <Typography.Text>{todo.text}</Typography.Text>
                </Row>
              </Card>
            </Col>
          )}
        </Row>

      </Content>

      <Footer style={{ textAlign: 'center', width: '100%' }}>
                ANT Design Todo App ©2024
                Created by Pasichmaria
      </Footer>
    </Layout>
  )
}
