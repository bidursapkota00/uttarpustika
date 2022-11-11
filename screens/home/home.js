import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {getUser} from '../../utils/mobx/auth.store';
import {base_url} from '../../utils/const';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {styles} from './home.css';

const screenWidth = Dimensions.get('window').width;

const chartdata = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(255,255, 255, ${opacity})`, // optional
    },
  ],
  legend: ['Rainy Days'], // optional
};

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  // barPercentage: 0.5,
  // useShadowColorFromDataset: false, // optional
};

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

const Home = ({navigation}) => {
  const [data, setData] = useState({});
  const [chartHeight, setChartHeight] = useState(300);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {device} = await getUser();
  //     const res = await postData(base_url + '/api/apk/home', {
  //       device,
  //     });
  //     setData(res.message);
  //   };
  //   fetchData().catch(error => console.log(error));
  // }, []);

  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    setChartHeight(height);
  };

  return (
    <View style={styles.home}>
      <LinearGradient colors={['#1b8bb9', '#095d9b']} style={styles.gradient}>
        <View style={styles.left}>
          <View style={styles.row}>
            <Icon name="account-circle" size={30} color="#9ce1e8" />
            <Text style={styles.text}>Bidur Sapkota</Text>
          </View>
          <View style={styles.row}>
            <Icon name="house" size={30} color="#9ce1e8" />
            <Text style={styles.text}>Nakhipot, Lalitpur</Text>
          </View>
          <View style={styles.row}>
            <Icon name="speed" size={30} color="#9ce1e8" />
            <Text style={styles.text}>78 units</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Icon name="opacity" size={80} color="#9ce1e8" />
          <Text style={[styles.ltr]}>10089 ltr.</Text>
        </View>
      </LinearGradient>

      <View style={styles.chart__cont} onLayout={onLayout}>
        <LineChart
          data={chartdata}
          width={screenWidth}
          height={Math.floor(chartHeight)}
          chartConfig={chartConfig}
        />
      </View>
    </View>
  );
};

export default Home;
