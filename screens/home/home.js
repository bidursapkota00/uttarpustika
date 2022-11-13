import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {getUser} from '../../utils/mobx/auth.store';
import {base_url} from '../../utils/const';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {styles} from './home.css';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(9, 93, 155, ${opacity})`,
  decimalPlaces: 1,
  propsForLabels: {
    fontSize: 18,
  },
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
  const [userData, setUserData] = useState({});
  const [litreData, setLitreData] = useState({});
  const [chartHeight, setChartHeight] = useState(0);
  const [date, setDate] = useState(new Date());

  const chartdata = {
    labels: litreData?.labels?.length
      ? litreData.labels.map(l => new Date(l).getMinutes())
      : [''],
    datasets: [
      {
        data: litreData?.data?.length ? litreData.data : [0],
        color: (opacity = 1) => `rgba(9, 93, 155, ${opacity})`, // optional
      },
    ],
    legend: ['Litre'],
  };

  useEffect(() => {
    const fetchData = async () => {
      const {device} = await getUser();
      const res = await postData(base_url + '/api/apk/home', {
        device,
      });
      setUserData(res?.message);
    };
    fetchData().catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const {device} = await getUser();
      let date1 = new Date(date);
      date1 = new Date(date1.setHours(date1.getHours(), 0, 0, 0));
      let date2 = new Date(date1);
      date2 = new Date(date2.setHours(date2.getHours() + 1));
      const res = await postData(base_url + '/api/apk/getdata', {
        device,
        date1,
        date2,
      });
      setLitreData(res?.message);
    };
    fetchData().catch(error => console.log(error));
  }, [date]);

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
            <Text style={styles.textUser}>{userData?.user?.name}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="house" size={30} color="#9ce1e8" />
            <Text style={styles.textUser}>{userData?.user?.address}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="speed" size={30} color="#9ce1e8" />
            <Text style={styles.text}>
              {(userData?.total_litre / 1000)?.toFixed(3)} units
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Icon name="opacity" size={80} color="#9ce1e8" />
          <Text style={[styles.ltr]}>
            {userData?.total_litre?.toFixed(1)} ltr.
          </Text>
        </View>
      </LinearGradient>

      <DatePicker
        date={date}
        onDateChange={setDate}
        maximumDate={new Date()}
        androidVariant="nativeAndroid"
        mode="datetime"
        textColor="#095d9b"
        style={{width: screenWidth}}
        minuteInterval={30}
      />

      <View style={styles.chart__cont} onLayout={onLayout}>
        {chartHeight ? (
          <LineChart
            data={chartdata}
            width={screenWidth}
            height={Math.floor(chartHeight)}
            chartConfig={chartConfig}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Home;
