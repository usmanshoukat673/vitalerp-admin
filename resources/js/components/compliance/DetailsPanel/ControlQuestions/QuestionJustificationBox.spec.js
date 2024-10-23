import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { setControlQuestions } from '../../../../actions';
import QuestionJustificationBox from './QuestionJustificationBox';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../../actions', () => ({
  setControlQuestions: jest.fn(),
}));

jest.mock('../../../../api/api', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

describe('QuestionJustificationBox', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      control_questions: [],
      details_panel_type: 'standard',
      parent_domain: {},
      sub_domain: {},
      parent_sections: [],
    });
    axiosInstance.post.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the question justification box component', () => {
    render(<QuestionJustificationBox question={{ id: 1, justification: 'Test justification' }} />);

    expect(screen.getByText('Justification:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Test justification');
  });

  it('saves the justification for a question', async () => {
    render(<QuestionJustificationBox question={{ id: 1, justification: 'Test justification' }} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New justification' } });

    expect(axiosInstance.post).toHaveBeenCalledWith('/api/user/compliance/company-control-question/update-justification', {
      id: 1,
      justification: 'New justification',
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(setControlQuestions).toHaveBeenCalledWith([
      { id: 1, justification: 'New justification' },
    ]);
  });

  it('clears errors when saving justification', async () => {