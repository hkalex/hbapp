import React, { Component, PropTypes } from 'react';
import { Row, Col, Panel, Table } from 'react-bootstrap';

export default class TableList extends Component {

  renderThead() {
    return this.props.thead.map((v, i) => {
      return <th key={i}>{v}</th>
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={12}>
            <Panel header={this.props.header}>
              <Table responsive hover>
                <thead>
                  <tr>
                    {this.renderThead()}
                  </tr>
                </thead>
                <tbody>
                  {this.props.renderTbody()}
                </tbody>
              </Table>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

TableList.propTypes = {
  header: PropTypes.string.isRequired,
  thead: PropTypes.array.isRequired,
  renderTbody: PropTypes.func.isRequired
}