import { fireEvent, screen } from '@testing-library/react'
import { render } from 'utils/test-utils'
import { renderWithTheme } from 'utils/tests/helpers'

import Menu from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
  query: {}
}))

describe('<Menu />', () => {
  it('should render the menu', () => {
    renderWithTheme(<Menu />)

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /won games/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/shopping cart/i)).toHaveLength(2)
  })

  it('should handle the open/close mobile menu', () => {
    renderWithTheme(<Menu />)

    // selecionar o nosso MenuFull
    const fullMenuElement = screen.getByRole('navigation', { hidden: true })

    // verificar se o menu tá escondido
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })

    // clicar no botão de abrir o menu e verificar se ele abriu
    fireEvent.click(screen.getByLabelText(/open menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false')
    expect(fullMenuElement).toHaveStyle({ opacity: 1 })

    // clicar no botão de fechar o menu e verificar se ele fechou
    fireEvent.click(screen.getByLabelText(/close menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })
  })

  it('should show register box when logged out', () => {
    renderWithTheme(<Menu />)

    expect(screen.queryByText(/meu perfil/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument()
    // expect(screen.getByText(/Inscreva-se/i)).toBeInTheDocument()
    // expect(screen.getAllByText(/Entrar/i)).toHaveLength(2)
  })

  it('should show wishlight and account when logged in', () => {
    renderWithTheme(<Menu username="will" />)

    expect(screen.getAllByText(/meu perfil/i)).toHaveLength(2)
    expect(screen.getAllByText(/wishlist/i)).toHaveLength(2)
    expect(screen.queryByText(/Entrar/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Inscreva-se/i)).not.toBeInTheDocument()
  })

  it('should not show sign ir or dropdownUser if loading', () => {
    render(<Menu username="will" loading />)

    expect(screen.queryByText(/meu perfil/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Entrar/i)).not.toBeInTheDocument()
  })
})
