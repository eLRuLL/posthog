import React, { Component } from 'react'
import { selectStyle } from '../../lib/utils'
import { Select, Col, Row } from 'antd'

export function ShownAsFilter({ shown_as, onChange }) {
    let options = ['Volume', 'Stickiness']
    return (
        <Col>
            <Row>
                <Select
                    defaultValue={shown_as}
                    value={shown_as || 'Volume'}
                    onChange={value => onChange(value)}
                    style={{ width: 200 }}
                >
                    <Select.Option value={'Volume'}>{'Volume'}</Select.Option>
                    <Select.Option value={'Stickiness'}>{'Stickiness'}</Select.Option>
                </Select>
            </Row>
        </Col>
    )
}
