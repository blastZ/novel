import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  console.log(router.query);

  return <div>test</div>;
};
