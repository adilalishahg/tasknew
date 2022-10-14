import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
  place: 'topRight',
  duration: 2,
  maxCount: 8,
});
export const onSuccess = (e) => {
  const id = toast.success(e);
};
export const onError = (e) => {
  const id = toast.error(e);
};
//   const onErrorClick = () => {
//     const id = toast.error('hello world');
//   };
//   const onInfoClick = () => {
//     const id = toast.info('hello world');
//   };
//   const onWarningClick = () => {
//     const id = toast.warning('hello world');
//   };
//   const onRemoveAll = () => {
//     toast.removeAll();
//   };

// export default Alert;
