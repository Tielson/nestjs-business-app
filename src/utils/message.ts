type RegisterMessageProps = {
  company: string
}

type LoginMessageProps = {
  company: string
  link: string
}


export const registerMessage = ({ company }: RegisterMessageProps) => {
return  `
  Assunto: Bem-vindo(a) à  ZENDA- Gestão Inteligente!

Corpo do e-mail:

Olá, ${company},

É um prazer ter você conosco! 🎉

Seu cadastro na ZENDA- Gestão Inteligente foi concluído com sucesso, e estamos prontos para ajudar você a gerenciar suas finanças e clientes de forma eficiente e descomplicada.

O que você pode fazer agora:
Explorar todos os recursos da aplicação.
Configurar suas preferências e começar a organizar suas finanças.
Contar com nosso suporte sempre que precisar!
Acesse sua conta:
Clique no botão abaixo para acessar sua conta e começar a usar a ZENDA- Gestão Inteligente:

Se você tiver qualquer dúvida ou precisar de assistência, nossa equipe está à disposição para ajudar. Entre em contato pelo e-mail techn3xus@gmail.com.

Obrigado por confiar na ZENDA- Gestão Inteligente!

Atenciosamente,
  TechNexus
Equipe ZENDA- Gestão Inteligente
`
}

export const loginMessage = ({ company, link }: LoginMessageProps) => {
  return `
    Assunto: Bem-vindo(a) à ZENDA- Gestão Inteligente!
  
    Olá, ${company},
  
    É um prazer ter você conosco! 🎉
  
    Seu cadastro na ZENDA- Gestão Inteligente foi concluído com sucesso, e estamos prontos para ajudar você a gerenciar suas finanças e clientes de forma eficiente e descomplicada.
  
    O que você pode fazer agora:
    - Explorar todos os recursos da aplicação.
    - Configurar suas preferências e começar a organizar suas finanças.
    - Contar com nosso suporte sempre que precisar!

    Acesse sua conta:
    Para acessar sua conta, clique no link abaixo e faça login:
    ${link}

    Se você tiver qualquer dúvida ou precisar de assistência, nossa equipe está à disposição para ajudar. Entre em contato pelo e-mail techn3xus@gmail.com.
  
    Obrigado por confiar na ZENDA- Gestão Inteligente!

    Atenciosamente,
    TechNexus
    Equipe ZENDA- Gestão Inteligente
  `;
}
