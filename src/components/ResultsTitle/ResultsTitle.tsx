import { LinkButton } from '../Button';
import classes from './ResultsTitle.module.css';

interface Props {
  date: string
}
export const ResultsTitle = ({ date }: Props) => {

  const readableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {readableDate}</h1>
      <LinkButton link='/events'>Show all events</LinkButton>
    </section>
  );
}
