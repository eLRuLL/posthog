import React, { useEffect } from 'react'
import api from '../../lib/api'
import { Loading, toParams } from '../../lib/utils'
import { LineGraph } from './LineGraph'
import { useActions, useValues } from 'kea'
import { trendsLogic } from 'scenes/trends/trendsLogic'

export function ActionsLineGraph({ dashboardItemId = null, filters: filtersParam }) {
    const { filters, results } = useValues(trendsLogic({ dashboardItemId, filters: filtersParam }))
    const { loadResults, showPeople } = useActions(trendsLogic({ dashboardItemId, filters: filtersParam }))

    const { people_action, people_day, ...otherFilters } = filters

    useEffect(() => {
        loadResults()
    }, [toParams(otherFilters)])

    return results ? (
        results.reduce((total, item) => total + item.count, 0) > 0 ? (
            <LineGraph
                type="line"
                datasets={results}
                labels={results[0].labels}
                onClick={
                    dashboardItemId
                        ? null
                        : point => {
                              const {
                                  dataset: { action },
                                  day,
                              } = point
                              showPeople(action, day)
                          }
                }
            />
        ) : (
            <p style={{ textAlign: 'center', paddingTop: '4rem' }}>
                We couldn't find any matching events. Try changing dates or pick another action or event.
            </p>
        )
    ) : (
        <Loading />
    )
}
