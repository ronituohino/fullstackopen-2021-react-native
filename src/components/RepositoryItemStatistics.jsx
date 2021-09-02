import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textGray,
  },
});

const RepositoryItemStatistics = ({ item }) => {
  return (
    <View style={styles.statistics}>
      <StatisticBox statistic={item.stargazersCount} baseText="Stars" />
      <StatisticBox statistic={item.forksCount} baseText="Forks" />
      <StatisticBox statistic={item.reviewCount} baseText="Reviews" />
      <StatisticBox statistic={item.ratingAverage} baseText="Rating" />
    </View>
  );
};

const StatisticBox = ({ statistic, baseText }) => {
  return (
    <View style={styles.statisticBox}>
      <Text style={styles.statisticNumber}>{statistic}</Text>
      <Text style={styles.statisticText}>{baseText}</Text>
    </View>
  );
};

export default RepositoryItemStatistics;
