import { render, screen } from '@/test-utils';
import Navbar from './Navbar';

describe('Welcome component', () => {
  it('has correct Navbar test rendered', () => {
    render(<Navbar />);
    expect(screen.getByText('Navbar')).toBeVisible();
  });
});
