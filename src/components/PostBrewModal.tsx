import React from 'react';
import Check from './Check';
import Modal, { ModalProps } from './Modal';
import Spacer from './Spacer';
import Text, { TextSize } from './Text';

export enum PostBrewModalType {
  SUCCESS,
  FAILURE,
}

interface IProps extends ModalProps {
  type: PostBrewModalType;
  brewReadyTime: string;
}

const PostBrewModal: React.FC<IProps> = (props) => {
  const ErrorModal: React.FC = () => {
    return (
      <Modal {...props}>
        <Text
          size={TextSize.LARGE}
          style={{
            color: 'black',
            fontWeight: 'bold',
            position: 'absolute',
            top: 20,
          }}
        >
          Oops!
        </Text>

        <Text>Something went wrong...</Text>

        <Spacer height={20} />

        <Spacer height={20} />
        <Text>Your request could not be sent.</Text>
        <Text>Please try again later!</Text>
      </Modal>
    );
  };

  const SuccessModal: React.FC = () => {
    return (
      <Modal {...props}>
        <Text
          size={TextSize.LARGE}
          style={{
            color: 'black',
            fontWeight: 'bold',
            position: 'absolute',
            top: 20,
          }}
        >
          Success!
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Your BrewDaddy has received your brew request.
        </Text>
        <Spacer height={20} />
        <Check />
        <Spacer height={20} />
        <Text>Your brew will be ready at {props.brewReadyTime}</Text>
      </Modal>
    );
  };

  if (props.type === PostBrewModalType.FAILURE) return <ErrorModal />;

  return <SuccessModal />;
};

export default PostBrewModal;
