import { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'dva';
import { Field, Form, reduxForm } from 'redux-form';
import { Button, Col, Icon, Row, Table } from 'antd';

import { AInput, APhoneInput, ATextarea } from '../../components/fields';

class Settings extends Component {
  render() {
    const { handleSubmit, taxRates } = this.props;

    return (
      <div>
        <h1>Settings</h1>
        <Row gutter={32}>
          <Col span={12}>
            <h2>
              <Icon type="home" />
              {` Company details`}
            </h2>
            <Form layout="vertical" onSubmit={handleSubmit}>
              <Field
                name="name"
                component={AInput}
                label="Company name"
              />
              <Field
                name="address"
                component={ATextarea}
                label="Address"
              />
              <Field
                name="email"
                component={AInput}
                label="Email"
              />
              <Field
                name="phone"
                component={APhoneInput}
                label="Phone"
              />
              <Row gutter={16}>
                <Col span={12}>
                  <Field
                    name="vatin"
                    component={AInput}
                    label="VATIN"
                  />
                </Col>
                <Col span={12}>
                  <Field
                    name="website"
                    component={AInput}
                    label="Website"
                  />
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={12}>
            <h2>
              <Icon type="picture" />
              {` Logo`}
            </h2>
            <Field
              name="notes"
              component={ATextarea}
              label="Invoice notes"
            />
            <h2>
              <Icon type="file-text" />
              {` Invoice details`}
            </h2>
            <Field
              name="notes"
              component={ATextarea}
              label="Invoice notes"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>
              <Icon type="calculator" />
              {` Tax rates`}
            </h2>
            <Button type="primary" style={{ float: 'right' }}>
              New tax
            </Button>
            <Table
              dataSource={taxRates.items}
              pagination={false}
              loading={taxRates.loading}
              rowKey="id"
              size="middle"
              bordered
            >
              <Table.Column title="Name" dataIndex="name" key="name" />
              <Table.Column
                title="Description"
                dataIndex="description"
                key="description"
              />
              <Table.Column
                title="Percentage"
                dataIndex="percentage"
                className="text-right"
                key="percentage"
                render={percentage => `${percentage} %`}
              />
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

export default compose(
  connect(state => ({
    taxRates: state.taxRates
  })),
  reduxForm({
    form: 'settings',
    onSubmit: (data, dispatch) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'settings/save', data: data, resolve, reject });
      });
    },
  })
)(Settings);
