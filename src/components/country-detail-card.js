import { Card, Text, View } from 'react-native-ui-lib'
import React from 'react'
import { StyleSheet } from 'react-native'
import { StatDetailRow } from './stat-detail-row'
import { tryEmoji } from '../utils/helper-methods'
import { TEST_ID_COUNTRY_NAME, TEST_ID_COUNTRY_SLUG } from '../test-ids'
import { CONFIRMED, DEATHS, GLOBAL, RECOVERIES } from '../strings'
import { countryPropTypes } from '../prop-types'

export const CountryDetailCard = React.memo(function CountryDetailCard ({ country }) {
  return (
    <Card
      padding={10}
      margin={10}
      style={styles.align}>
      <View
        margin={10}>
        <Text
          uppercase
          text30H
          testID={TEST_ID_COUNTRY_NAME(country.Slug)}>
          {`${tryEmoji(country.CountryCode)} ${country.Country || GLOBAL}`}
        </Text>
      </View>
      <StatDetailRow
        statName={CONFIRMED}
        statTotal={country.TotalConfirmed}
        statNew={country.NewConfirmed}
        testIdPrefix={TEST_ID_COUNTRY_SLUG(country.Slug)}/>
      <StatDetailRow
        statName={DEATHS}
        statTotal={country.TotalDeaths}
        statNew={country.NewDeaths}
        testIdPrefix={TEST_ID_COUNTRY_SLUG(country.Slug)}/>
      <StatDetailRow
        statName={RECOVERIES}
        statTotal={country.TotalRecovered}
        statNew={country.NewRecovered}
        recoveries={true}
        testIdPrefix={TEST_ID_COUNTRY_SLUG(country.Slug)}/>
    </Card>
  )
})

CountryDetailCard.propTypes = {
  country: countryPropTypes
}

const styles = StyleSheet.create({
  align: {
    alignSelf: 'stretch'
  }
})
