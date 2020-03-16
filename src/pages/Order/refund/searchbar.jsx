import React, { Component } from 'react'
import { Form, Button, Col, Input, Row, Select } from 'antd'
import './refund.less'
const SearchBar = props => {
  const { search } = props
  const _form = props.form
  const search_form = {
    pcode: '',
    pconnect: ''
  }
  //生成搜索字段
  const getFields = () => {
    const { getFieldDecorator } = _form
    const children = Object.keys(search_form).map((item, i) => {
      return (
        <Col span={8} key={i}>
          <Form.Item label={item}>
            {getFieldDecorator(item)(<Input placeholder='input serarch' />)}
          </Form.Item>
        </Col>
      )
    })
    return children
  }

  const handleSearch = e => {
    e.preventDefault()
    _form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
      search(values)
    })
  }

  const handleReset = () => {
    _form.resetFields()
  }
  return (
    <Form className='ant-advanced-search-form' onSubmit={handleSearch}>
      <Row gutter={24}>
        {getFields()}
        <Col span={8}>
          <Button type='primary' htmlType='submit'>
            Search
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
const Search = Form.create({ name: 'refund_search' })(SearchBar)
export default Search
