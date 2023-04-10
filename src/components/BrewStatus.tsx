import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text, { TextSize } from './Text';
import { useAPI } from '../api/api';
import { H_TO_SEC, MIN_TO_SEC, REFETCH_STATUS_MS, SEC_TO_MS } from '../consts';
import { IBrewStatus } from '../api/types/types';
import moment from 'moment-timezone';
import Spacer from './Spacer';
import { COLORS } from '../assets/colors';
import Loading from './Loading';
import Check from './Check';
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
        if (JSON.stringify(res) !== JSON.stringify(status)) {
          setStatus(res);
          setHasError(false);
        }
      })
      .catch(() => setHasError(true));

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
        <Text style={Style.text} size={TextSize.MEDIUM}>
          Loading brew status...
        </Text>
      </View>
    );
  };

  const ErrorView: React.FC = () => {
    return (
      <View style={Style.container}>
        <Text style={Style.statusText} size={TextSize.LARGE}>
          Uh oh!
        </Text>
        <Loading />
        <Text style={Style.error} size={TextSize.SMALL}>
          There was an error getting your brew schedule. Trying again...
        </Text>
      </View>
    );
  };

  const NoBrewsView: React.FC = () => {
    return (
      <View style={Style.container}>
        <Text style={Style.statusText} size={TextSize.LARGE}>
          Your brew status
        </Text>
        <Image
          source={IMAGES.questionBev}
          resizeMode="contain"
          style={{
            height: 250,
            width: '100%',
            marginTop: -60,
            marginBottom: -40,
          }}
        />
        <Text style={Style.text} size={TextSize.MEDIUM}>
          Schedule a brew to get started!
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
        <Check />
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

  if (hasError) return <ErrorView />;

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
  error: {
    textAlign: 'center',
    color: '#dddd77',
  },
});
