import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API - Sistema de Posts e Autores',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários, autores e posts com autenticação JWT',
            contact: {
                name: 'Suporte da API',
                email: 'suporte@api.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor de desenvolvimento'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Token JWT para autenticação'
                },
            },
            schemas: {
                // Schema do Usuário
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID único do usuário'
                        },
                        name: {
                            type: 'string',
                            description: 'Nome completo do usuário'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email único do usuário'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data da última atualização'
                        }
                    },
                    required: ['name', 'email']
                },
                // Schema de entrada do Usuário (sem senha retornada)
                UserInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nome completo do usuário',
                            example: 'João Silva'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email único do usuário',
                            example: 'joao@email.com'
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            description: 'Senha do usuário',
                            example: 'senha123'
                        }
                    },
                    required: ['name', 'email', 'password']
                },
                // Schema do Autor
                Author: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID único do autor'
                        },
                        name: {
                            type: 'string',
                            description: 'Nome completo do autor'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do autor'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data da última atualização'
                        }
                    },
                    required: ['name', 'email']
                },
                // Schema de entrada do Autor
                AuthorInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nome completo do autor',
                            example: 'Maria Santos'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do autor',
                            example: 'maria@email.com'
                        }
                    },
                    required: ['name', 'email']
                },
                // Schema do Post
                Post: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID único do post'
                        },
                        title: {
                            type: 'string',
                            description: 'Título do post'
                        },
                        description: {
                            type: 'string',
                            description: 'Descrição/conteúdo do post'
                        },
                        author: {
                            $ref: '#/components/schemas/Author',
                            description: 'Dados do autor do post'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data da última atualização'
                        }
                    },
                    required: ['title', 'author']
                },
                // Schema de entrada do Post
                PostInput: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Título do post',
                            example: 'Meu primeiro post'
                        },
                        description: {
                            type: 'string',
                            description: 'Descrição/conteúdo do post',
                            example: 'Este é o conteúdo do meu primeiro post...'
                        },
                        author: {
                            $ref: '#/components/schemas/AuthorInput',
                            description: 'Dados do autor do post'
                        }
                    },
                    required: ['title', 'author']
                },
                // Schema de Login
                LoginInput: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário',
                            example: 'usuario@email.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Senha do usuário',
                            example: 'senha123'
                        }
                    },
                    required: ['email', 'password']
                },
                // Schema de resposta do Login
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                            description: 'Token JWT para autenticação'
                        },
                        user: {
                            $ref: '#/components/schemas/User',
                            description: 'Dados do usuário autenticado'
                        }
                    }
                },
                // Schema de erro
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Mensagem de erro'
                        },
                        error: {
                            type: 'string',
                            description: 'Detalhes do erro'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Auth',
                description: 'Endpoints de autenticação'
            },
            {
                name: 'Users',
                description: 'Gerenciamento de usuários'
            },
            {
                name: 'Authors',
                description: 'Gerenciamento de autores'
            },
            {
                name: 'Posts',
                description: 'Gerenciamento de posts'
            }
        ],
        paths: {
            // Endpoints de Autenticação
            '/auth/login': {
                post: {
                    summary: 'Fazer login',
                    description: 'Autentica um usuário e retorna um token JWT',
                    tags: ['Auth'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/LoginInput'
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Login realizado com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/LoginResponse'
                                    }
                                }
                            }
                        },
                        401: {
                            description: 'Credenciais inválidas',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Dados inválidos',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            
            // Endpoints de Usuários
            '/users': {
                get: {
                    summary: 'Lista todos os usuários',
                    tags: ['Users'],
                    responses: {
                        200: {
                            description: 'Lista de usuários',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/User'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: 'Registra um novo usuário',
                    tags: ['Users'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UserInput'
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Usuário criado com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Dados inválidos',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/users/{id}': {
                get: {
                    summary: 'Busca um usuário pelo ID',
                    tags: ['Users'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do usuário'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Usuário encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        },
                        404: {
                            description: 'Usuário não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    summary: 'Atualiza um usuário',
                    tags: ['Users'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do usuário'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UserInput'
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Usuário atualizado com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        },
                        401: {
                            description: 'Não autorizado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        },
                        404: {
                            description: 'Usuário não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: 'Remove um usuário',
                    tags: ['Users'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do usuário'
                        }
                    ],
                    responses: {
                        204: {
                            description: 'Usuário removido com sucesso'
                        },
                        401: {
                            description: 'Não autorizado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        },
                        404: {
                            description: 'Usuário não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/users/search/{name}': {
                get: {
                    summary: 'Busca usuários por nome',
                    tags: ['Users'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'name',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'Nome ou parte do nome do usuário'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Lista de usuários encontrados',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/User'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            
            // Endpoints de Autores
            '/authors': {
                get: {
                    summary: 'Lista todos os autores',
                    tags: ['Authors'],
                    responses: {
                        200: {
                            description: 'Lista de autores',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Author'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: 'Cria um novo autor',
                    tags: ['Authors'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/AuthorInput'
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Autor criado com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Author'
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Dados inválidos',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/authors/{id}': {
                get: {
                    summary: 'Busca um autor pelo ID',
                    tags: ['Authors'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do autor'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Autor encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Author'
                                    }
                                }
                            }
                        },
                        404: {
                            description: 'Autor não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    summary: 'Atualiza um autor',
                    tags: ['Authors'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do autor'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/AuthorInput'
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Autor atualizado com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Author'
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Dados inválidos',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        },
                        404: {
                            description: 'Autor não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: 'Remove um autor',
                    tags: ['Authors'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do autor'
                        }
                    ],
                    responses: {
                        204: {
                            description: 'Autor removido com sucesso'
                        },
                        404: {
                            description: 'Autor não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/authors/search/{name}': {
                get: {
                    summary: 'Busca autores por nome',
                    tags: ['Authors'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'name',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'Nome ou parte do nome do autor'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Lista de autores encontrados',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Author'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            
            // Endpoints de Posts
            '/posts': {
                get: {
                    summary: 'Lista todos os posts',
                    tags: ['Posts'],
                    responses: {
                        200: {
                            description: 'Lista de posts',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Post'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: 'Cria um novo post',
                    tags: ['Posts'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/PostInput'
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Post criado com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Post'
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Dados inválidos',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/posts/{id}': {
                get: {
                    summary: 'Busca um post pelo ID',
                    tags: ['Posts'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do post'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Post encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Post'
                                    }
                                }
                            }
                        },
                        404: {
                            description: 'Post não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    summary: 'Atualiza um post',
                    tags: ['Posts'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do post'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/PostInput'
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Post atualizado com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Post'
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Dados inválidos',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        },
                        404: {
                            description: 'Post não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: 'Remove um post',
                    tags: ['Posts'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID do post'
                        }
                    ],
                    responses: {
                        204: {
                            description: 'Post removido com sucesso'
                        },
                        404: {
                            description: 'Post não encontrado',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;