import React, {useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Listview from '../../components/listview/listview';
import UniversityItem from './universityItem';
import {styles} from './home.css';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {boards, slideImg} from '../../utils/data';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const Home = ({navigation}) => {
  const carousel = useRef(null);
  const [index, setIndex] = React.useState(0);

  const _renderItem = ({item, index}) => {
    return (
      <View style={[styles.slide, {width: ITEM_WIDTH}]}>
        <Image
          style={styles.slideimg}
          source={{
            uri: item,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cont}>
        <View>
          <Carousel
            ref={carousel}
            data={slideImg}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            autoplay
            onBeforeSnapToItem={index => setIndex(index)}
            autoplayDelay={2000}
            autoplayInterval={2000}
            loop
            enableSnap
            loopClonesPerSide={slideImg.length}
            scrollEnabled
          />
          <Pagination
            dotsLength={slideImg.length}
            activeDotIndex={index}
            carouselRef={carousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
        <ScrollView style={{height: 200}}>
          <View style={styles.listc}>
            {boards.map((b, i) => {
              return (
                <View style={styles.list} key={b.title}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('Board', {
                        itemId: b.title,
                        otherParam: 'anything you want here',
                      })
                    }>
                    <UniversityItem index={i}>
                      <Listview board={b} />
                    </UniversityItem>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.ads}>
        <Image
          style={styles.ad}
          source={{
            uri: 'https://c8.alamy.com/comp/PT97M3/design-bright-banner-on-white-background-horizontal-autumn-banner-autumn-sale-30-off-vector-illustrations-for-flyers-posters-email-ads-promotional-material-PT97M3.jpg',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
