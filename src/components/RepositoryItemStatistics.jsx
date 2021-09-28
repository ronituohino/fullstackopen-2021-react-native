import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  statistics: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },

  statisticBox: {
    padding: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },

  statisticNumber: {
    alignSelf: 'center',
    fontWeight: theme.fontWeights.bold,
  },

  statisticText: {
    alignSelf: 'center',
  },
});

const RepositoryItemStatistics = ({ item }) => {
  return (
    <View style={styles.statistics}>
      <StatisticBox
        testID='stars'
        statistic={item.stargazersCount}
        baseText='Stars'
      />
      <StatisticBox
        testID='forks'
        statistic={item.forksCount}
        baseText='Forks'
      />
      <StatisticBox
        testID='reviews'
        statistic={item.reviewCount}
        baseText='Reviews'
      />
      <StatisticBox
        testID='rating'
        statistic={item.ratingAverage}
        baseText='Rating'
      />
    </View>
  );
};

const StatisticBox = ({ testID, statistic, baseText }) => {
  const formatStatisticNumber = (number) => {
    if (number > 1000) {
      return (Math.floor(number / 100) / 10).toString().concat('k');
    } else {
      return number;
    }
  };

  return (
    <View style={styles.statisticBox}>
      <Text testID={testID} style={styles.statisticNumber}>
        {formatStatisticNumber(statistic)}
      </Text>
      <Text color='gray' style={styles.statisticText}>
        {baseText}
      </Text>
    </View>
  );
};

export default RepositoryItemStatistics;
