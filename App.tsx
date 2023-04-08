import { Animated, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const headerSectionHeight = 500;

const headerTabs = [
  {
    text: 'Tab 1'
  },
  {
    text: 'Tab 2'
  },
  {
    text: 'Tab 3'
  },
  {
    text: 'Tab 4'
  },
  {
    text: 'Tab 5'
  },
]

const renderHeaderTabs = () => (
  <View style={styles.headerTabView}>
    <ScrollView 
      bounces={false}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      {headerTabs.map((tab,index) => (
        <TouchableOpacity key={index} style={styles.tab}>
          <Text style={styles.tabText}>{tab.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)

const BodySection = () => {
  const data = new Array(100).fill(0)
  return (
    <View>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  )
}

export default function App() {
  const scrollY = new Animated.Value(0)
  const stickyTop = scrollY.interpolate({
    outputRange: [-150, 0],
    inputRange: [headerSectionHeight, headerSectionHeight + 150],
    extrapolate: 'clamp'
  })
  const stickyOpacity = scrollY.interpolate({
    outputRange: [0, 1],
    inputRange: [headerSectionHeight, headerSectionHeight + 10],
    extrapolate: 'clamp'
  })
  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}],{
          useNativeDriver: false
        })}
      >
        <View style={styles.headerSection}
        >
          {renderHeaderTabs()}
        </View>
        <BodySection />
      </ScrollView>
      <Animated.View style={[styles.animatedView,{
        top: stickyTop,
        opacity: stickyOpacity
      }]}>
        {renderHeaderTabs()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    height: 150,
    // paddingBottom: 16,
    backgroundColor: '#F4EEE0',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: -150, // -150 -> 0
    left: 0,
    right: 0,
    opacity: 1,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 16,
        shadowOffset: {
          width: 4,
          height: 3,
        },
      },
    }),
  },
  headerSection: {
    height: headerSectionHeight,
    justifyContent: 'flex-end',
    backgroundColor: '#F4EEE0'
  },
  headerTabView: {
    paddingVertical: 24,
    backgroundColor: '#F4EEE0',
  },
  tab: {
    backgroundColor: '#6D5D6E',
    marginHorizontal: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    paddingVertical: 5
  },
  tabText: {color: '#fff'},
  item: {
    backgroundColor: '#4F4557',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  itemText: {textAlign: 'center'}
});
