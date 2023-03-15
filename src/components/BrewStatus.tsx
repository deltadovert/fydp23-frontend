import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Text, { TextSize } from './Text';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useAPI } from '../api/api';
import { H_TO_SEC, MIN_TO_SEC, REFETCH_STATUS_MS, SEC_TO_MS } from '../consts';
import { IBrewStatus } from '../api/types/types';
import moment from 'moment-timezone';
import Spacer from './Spacer';
import { COLORS } from '../assets/colors';
import Loading from './Loading';
import { IMAGES } from '../assets/images/images';

const getFormattedString = (timestamp: number) => {
  const userTimezone = moment.tz.guess();

  const now = moment().tz(userTimezone);
  const then = moment.tz(timestamp * SEC_TO_MS, userTimezone);

  if (now.isSame(then, 'day')) {
    return `today @${then.format('h:mma')}`;
  } else if (now.subtract(1, 'day').isSame(then, 'day')) {
    return `yesterday @${then.format('h:mma')}`;
  } else {
    return then.format(`MMMM Do [@]h:mma`);
  }
};

const getTimeLeft = (timestamp: number, duration: number) => {
  const secs = moment((timestamp + duration) * SEC_TO_MS).diff(moment(), 's');

  if (secs >= H_TO_SEC) {
    const hours = Math.floor(secs / H_TO_SEC);
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }

  if (secs >= MIN_TO_SEC) {
    const mins = Math.floor(secs / MIN_TO_SEC);
    return `${mins} minute${mins === 1 ? '' : 's'}`;
  }

  return `${secs > 0 ? secs : 0} second${secs === 1 ? '' : 's'}`;
};

const BrewStatus: React.FC = () => {
  const api = useAPI();
  const [status, setStatus] = React.useState<IBrewStatus>();
  const [isLoading, setLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState<boolean>(false);

  const fetchStatus = async () =>
    await api
      .getStatus()
      .then((res) => {
        if (res !== status) {
          setStatus(res);
        }
      })
      .catch((err) => setHasError(true));

  React.useEffect(() => {
    setLoading(true);
    fetchStatus().finally(() => setLoading(false));
    const handler = setInterval(fetchStatus, REFETCH_STATUS_MS);
    return () => clearInterval(handler);
  }, []);

  const LoadingView: React.FC = () => {
    return (
      <View style={Style.container}>
        <Loading />
      </View>
    );
  };

  const NoBrewsView: React.FC = () => {
    return (
      <View style={Style.container}>
        <Text style={Style.statusText}>Your brew status</Text>
        <Spacer height={30} />
        <Text style={Style.text} size={TextSize.MEDIUM}>
          Schedule a brew to get started!
        </Text>
      </View>
    );
  };

  const StartingView: React.FC = () => {
    return (
      <View style={Style.container}>
        <Text style={Style.statusText}>Your brew status</Text>
        <Loading />
        <Text style={Style.text}>
          A new brew has been sent to your BrewDaddy!
        </Text>
      </View>
    );
  };

  const BrewingView: React.FC = () => {
    return (
      <View style={Style.container}>
        <Text style={Style.statusText} size={TextSize.LARGE}>
          Your brew status
        </Text>
        <Loading />
        <Text style={Style.text} size={TextSize.MEDIUM}>
          {getTimeLeft(status.start_timestamp, status.duration)} to go!
        </Text>
        <Spacer height={5} />
        <Text style={Style.text} size={TextSize.TINY}>
          Started brewing {getFormattedString(status.start_timestamp)}
        </Text>
      </View>
    );
  };

  const FinishedView: React.FC = () => {
    return (
      <View style={Style.container}>
        <Text style={Style.statusText} size={TextSize.LARGE}>
          Your brew status
        </Text>
        <Spacer height={10} />
        <Image
          source={IMAGES.checkMark}
          style={{ width: '100%', height: 75 }}
          resizeMode="contain"
        />
        <Spacer height={10} />
        <Text style={Style.text} size={TextSize.MEDIUM}>
          All Done. Enjoy!
        </Text>
        <Spacer height={5} />
        <Text style={Style.text} size={TextSize.TINY}>
          Finished brewing at {getFormattedString(status.finish_timestamp)}
        </Text>
      </View>
    );
  };

  if (isLoading) return <LoadingView />;

  if (!status.is_brewing && !status.is_done) return <NoBrewsView />;

  if (status.is_brewing) return <BrewingView />;

  if (status.is_done) return <FinishedView />;

  return null;
};

export default BrewStatus;

const Style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 10,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
