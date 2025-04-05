import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarImage from "../../assets/calendar.png";
import { useApi } from '../../hooks/useApi';

const AndroidTrades = () => {
  const { data, error, isLoading } = useApi<any>({
    endpoint: '/getTrades',
    queryOptions: {
      enabled: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchInterval: 5000,
    },
  });

  // Function to format numbers with spaces as separators
  const formatBalance = (value) => {
    return new Intl.NumberFormat('en-US', {
      useGrouping: true,
    })
      .format(value)
      .replace(/,/g, ' '); // Replace commas with spaces
  };


  const [balance, setBalance] = useState(1000);
  const [equity, setEquity] = useState(0);
  const [freeMargin, setFreeMargin] = useState(0);
  const [marginLevel, setMarginLevel] = useState(0);

  const [minOpen, setMinOpen] = useState(99900);
  const [maxOpen, setMaxOpen] = useState(100000);

  const [minClose, setMinClose] = useState(99900);
  const [maxClose, setMaxClose] = useState(100000);

  const [minProfit, setMinProfit] = useState(-5);
  const [maxProfit, setMaxProfit] = useState(5);

  const [margin, setMargin] = useState(1000);

  const [minTotal, setMinTotal] = useState(100);
  const [maxTotal, setMaxTotal] = useState(1000);

  const [currency, setCurrency] = useState('USD');

  //more settings
  const [minEquity, setMinEquity] = useState(100);
  const [maxEquity, setMaxEquity] = useState(1000);

  const [minFreeMargin, setMinFreeMargin] = useState(100);
  const [maxFreeMargin, setMaxFreeMargin] = useState(1000);

  const [minMarginLevel, setMinMarginLevel] = useState(100);
  const [maxMarginLevel, setMaxMarginLevel] = useState(1000);
  //more settings

  const [positions, setPositions] = useState([
    { id: '1', symbol: 'BTCUSDm', type: 'sell', lot: 0.01, open: 99901.89, close: 99943.34, profit: -0.41 },
    { id: '2', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99921.30, close: 99923.94, profit: 0.03 },
    { id: '3', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99924.69, close: 99923.94, profit: -0.01 },
    { id: '4', symbol: 'BTCUSDm', type: 'sell', lot: 0.01, open: 99901.89, close: 99943.34, profit: -0.41 },
    { id: '5', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99921.30, close: 99923.94, profit: 0.03 },
    { id: '6', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99924.69, close: 99923.94, profit: -0.01 },
    { id: '7', symbol: 'BTCUSDm', type: 'sell', lot: 0.01, open: 99901.89, close: 99943.34, profit: -0.41 },
    { id: '8', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99921.30, close: 99923.94, profit: 0.03 },
    { id: '9', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99924.69, close: 99923.94, profit: -0.01 },
    { id: '10', symbol: 'BTCUSDm', type: 'sell', lot: 0.01, open: 99901.89, close: 99943.34, profit: -0.41 },
    { id: '11', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99921.30, close: 99923.94, profit: 0.03 },
    { id: '12', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99924.69, close: 99923.94, profit: -0.01 },
    { id: '13', symbol: 'BTCUSDm', type: 'sell', lot: 0.01, open: 99901.89, close: 99943.34, profit: -0.41 },
    { id: '14', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99921.30, close: 99923.94, profit: 0.03 },
    { id: '15', symbol: 'BTCUSDm', type: 'buy', lot: 0.01, open: 99924.69, close: 99923.94, profit: -0.01 },
  ]);

  useEffect(() => {
    if (data?.data) {
      setPositions(data.data);
    }
  }, [data]);



  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('https://metatrader.gianthunterai.com/api/getTradingSettings');
        const data = await response.json();


        setMinOpen(parseInt(data?.data?.min_open));
        setMaxOpen(parseInt(data?.data?.max_open));
        setMinClose(parseInt(data?.data?.min_close));
        setMaxClose(parseInt(data?.data?.max_close));
        setMinProfit(parseInt(data?.data?.min_profit));
        setMaxProfit(parseInt(data?.data?.max_profit));
        setBalance(parseFloat(data?.data?.balance));
        setMargin(parseFloat(data?.data?.margin));
        setCurrency(data?.data?.currency);
        setMinTotal(parseInt(data?.data?.min_total));
        setMaxTotal(parseInt(data?.data?.max_total));

        setMinEquity(parseInt(data?.data?.min_equity));
        setMaxEquity(parseInt(data?.data?.max_equity));

        setMinFreeMargin(parseInt(data?.data?.min_free_margin));
        setMaxFreeMargin(parseInt(data?.data?.max_free_margin));

        setMinMarginLevel(parseInt(data?.data?.min_margin_level));
        setMaxMarginLevel(parseInt(data?.data?.max_margin_level));
      } catch (error) {
      }
    };

    // Fetch settings immediately and then every 2 seconds
    fetchSettings();
    const interval = setInterval(fetchSettings, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to generate random number within a range
  // const getRandomNumber = (min: number, max: number) => (Math.random() * (max - min) + min)?.toFixed(2);

  // // Function to update positions with random values
  // const updatePositions = () => {
  //   setPositions((prevPositions) =>
  //     prevPositions.map((pos) => ({
  //       ...pos,
  //       open: parseFloat(getRandomNumber(minOpen, maxOpen)),
  //       close: parseFloat(getRandomNumber(minClose, maxClose)),
  //       profit: parseFloat(getRandomNumber(minProfit, maxProfit)),
  //     }))
  //   );
  // };

  // Update positions at regular intervals
  useEffect(() => {
    const interval = setInterval(updatePositions, 1000); // Update every 2 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [minClose, maxClose, minOpen, maxOpen, minProfit, maxProfit]);

  // Recalculate financial metrics when positions update
  useEffect(() => {
    const totalProfit = positions?.reduce((acc, pos) => acc + pos?.profit, 0);
    const updatedEquity = balance + totalProfit;
    const updatedFreeMargin = parseFloat(updatedEquity) - parseFloat(margin);
    const updatedMarginLevel = parseInt(margin) > 0 ? (updatedEquity / margin) * 100 : 0;

    setEquity(updatedEquity);
    setFreeMargin(updatedFreeMargin);
    setMarginLevel(updatedMarginLevel);
  }, [positions]);


  const getRandomNumber = (min: number, max: number) => (Math.random() * (max - min) + min)?.toFixed(2);




  const [total, setTotal] = useState(140);
  //const [positions, setPositions] = useState([]); // Ensure you have positions initialized

  const updatePositions = () => {

    setPositions((prevPositions) => {
      const updatedPositions = prevPositions.map((pos, index) => {
        let previousProfit = index > 0 ? prevPositions[index - 1].profit : pos.profit;
        let change = parseFloat(getRandomNumber(-1, 2));
        let newProfit = previousProfit + change;

        //  console.log(data?.data[index]?.close);
        return {
          ...pos,
          open: pos?.open,
          close: parseFloat(getRandomNumber(data?.data[index]?.close, data?.data[index]?.max_close)),
          profit: parseFloat(newProfit.toFixed(2)),
        };
      });

      // Update total profit
      const newTotal = updatedPositions.reduce((sum, pos) => sum + pos.profit, 0);
      setTotal(parseFloat(newTotal.toFixed(2)));

      return updatedPositions;
    });
  };

  //Equity = Total + Balance
  // const [equity, setEquity] = useState(0);
  ///Margin = Balance/9.8
  //Free margin = Magin * 0.24
  //Margin level (%) = (Equity*100)/Magine


  // Run updatePositions every 800ms
  useEffect(() => {
    const interval = setInterval(updatePositions, 1000);
    return () => clearInterval(interval);
  }, []);



  // Update positions at regular intervals
  useEffect(() => {
    const interval = setInterval(updatePositions, 1000); // Update every 2 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [minClose, maxClose, minOpen, maxOpen, minProfit, maxProfit]);

  // Recalculate financial metrics when positions update
  useEffect(() => {
    const totalProfit = positions?.reduce((acc, pos) => acc + pos?.profit, 0);
    const updatedEquity = balance + totalProfit;
    const updatedFreeMargin = parseFloat(updatedEquity) - parseFloat(margin);
    const updatedMarginLevel = parseInt(margin) > 0 ? (updatedEquity / margin) * 100 : 0;

    setEquity(updatedEquity);
    setFreeMargin(updatedFreeMargin);
    setMarginLevel(updatedMarginLevel);
  }, [positions]);

  const renderPositionItem = (item) => (
    <View key={item.id} style={styles.positionRow}>
      <View style={styles.positionDetails}>
        <Text style={styles.positionSymbol}>
          {item.symbol}{" "}
          <Text style={{ color: item.type === 'buy' ? '#0D71F3' : '#DE4949' }}>
            {item.type} {item.lot}
          </Text>
        </Text>
        <Text style={styles.positionPrice}>
          {item?.open} → {!isNaN(item?.close) ? item?.close : item?.open}
        </Text>
      </View>
      <Text
        style={[
          styles.positionProfit,
          item.profit > 0 ? styles.profitPositive : styles.profitNegative,
        ]}
      >
        {item.profit.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === 'ios' && <View style={{ height: StatusBar.currentHeight || 40 }} />}

      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="menu" size={24} color="#000" />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerLabel}>Trade</Text>
            <Text style={[styles.headerTitle, 
            total < 0 && { color: '#DE4949', fontSize:15 },
            total>0&&{fontSize:14}

            ]}>
              {total < 0 ? '-' : ''}{formatBalance(Math.abs(total))} {currency}
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
           <Image source={CalendarImage} style={styles.icon} />
          <Icon name="swap-vertical" size={24} color="#666" />
          <Icon name="document-text-outline" size={24} color="#666" style={{ marginLeft: 15 }} />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        stickyHeaderIndices={[1]} 
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* info section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Balance:</Text>
            <Text style={styles.infoValue}>{formatBalance(parseFloat(balance))}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Equity:</Text>
            <Text style={styles.infoValue}>{formatBalance(parseFloat(total) + parseFloat(balance))}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Margin:</Text>
            <Text style={styles.infoValue}>{formatBalance(parseFloat(balance)/9.8)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Free Margin:</Text>
            <Text style={styles.infoValue}>{formatBalance((parseFloat(total) + parseFloat(balance))-(parseFloat(balance)/9.8*0.24))}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Margin Level (%):</Text>
            <Text style={styles.infoValue}>{formatBalance(((parseFloat(total) + parseFloat(balance))*100) / (parseFloat(balance)/9.8))}</Text>
          </View>
        </View>
        {/* Info section */}

        {/* Fixed "Positions" Header */}
        <View style={[styles.fixedSectionTitle, { flex: 1 }]}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={styles.sectionTitle}>Positions</Text>
            <Icon 
              name="ellipsis-horizontal"
              size={20} 
              color="#b3b3b5"
            />
          </View>
        </View>

        {/* Scrollable Positions Section */}
        <View>
          {positions.map((position) => renderPositionItem(position))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    // elevation: 2,
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleContainer: {
    marginLeft: 15,
  },
  headerLabel: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    // elevation: 2,
    zIndex: 1,
    marginTop: 10
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#0D71F3",
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.35 }],
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    marginHorizontal:15
  },
  infoSection: {
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  infoLabel: {
    color: '#000',
    fontSize: 14.5,
    //  fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.2 }],
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
    // fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.2 }],
  },
  fixedSectionTitle: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 1,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b3b3b5',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.2 }],
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    // marginBottom: 5,
    // borderRadius: 5,
    // marginHorizontal: 10,
  },
  positionDetails: {
    flex: 1,
  },
  positionSymbol: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.1 }],
  },
  positionPrice: {
    color: '#666',
    fontSize: 15,
    // fontFamily: "RobotoCondensed-SemiBold",
    // transform: [{ scaleY: 1.3 }],
  },
  positionProfit: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
    minWidth: 50,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.1 }],
  },
  profitPositive: {
    color: '#0D71F3',
    fontSize: 18,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.1 }],
  },
  profitNegative: {
    color: '#DE4949',
    fontSize: 23,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.1 }],
  },
});

export default AndroidTrades;
