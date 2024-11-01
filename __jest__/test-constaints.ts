const burgerFullState = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    id: '1bffaedb-6853-4693-9ea8-a2506e2d7549'
  },
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: '0b5b267b-b544-45ba-9817-e3cb1ef5b372'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0,
      id: '04124f1f-87af-485e-aae5-a58b024aaba1'
    }
  ]
};

const newIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0
};

const newBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const burgerAfterDeleteState = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    id: '04124f1f-87af-485e-aae5-a58b024aaba1'
  }
];

const burgerAfterReorderState = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    id: '04124f1f-87af-485e-aae5-a58b024aaba1'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    id: '0b5b267b-b544-45ba-9817-e3cb1ef5b372'
  }
];

const feedFullState = {
  orders: [
    {
      _id: '667dd974856777001bb1e5a0',
      ingredients: [
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2024-06-27T21:28:20.849Z',
      updatedAt: '2024-06-27T21:28:21.238Z',
      number: 44518
    },
    {
      _id: '667dcc0d856777001bb1e580',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный фалленианский антарианский бургер',
      createdAt: '2024-06-27T20:31:09.170Z',
      updatedAt: '2024-06-27T20:31:09.592Z',
      number: 44517
    },
    {
      _id: '667dcb35856777001bb1e57e',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Традиционный-галактический флюоресцентный минеральный бургер',
      createdAt: '2024-06-27T20:27:33.645Z',
      updatedAt: '2024-06-27T20:27:34.261Z',
      number: 44516
    }
  ],
  total: 44144,
  totalToday: 106
};

const ingredientsFullState = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

const orderList = [
  {
    _id: '666b6aa497ede0001d0707cd',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-06-13T21:54:44.317Z',
    updatedAt: '2024-06-13T21:54:44.708Z',
    number: 42320
  },
  {
    _id: '666b6ab397ede0001d0707ce',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-06-13T21:54:59.425Z',
    updatedAt: '2024-06-13T21:54:59.896Z',
    number: 42321
  },
  {
    _id: '666b6b3f97ede0001d0707d2',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-06-13T21:57:19.257Z',
    updatedAt: '2024-06-13T21:57:19.632Z',
    number: 42322
  }
];

const currentOrder = {
  data: {
    _id: '66708c33856777001bb1badf',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e'
    ],
    owner: '6669cea797ede0001d0703a6',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-06-17T19:19:15.336Z',
    updatedAt: '2024-06-17T19:19:15.810Z',
    number: 43120,
    __v: 0
  },
  request: false
};

const newOrder = {
  name: 'Краторный био-марсианский бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ],
    _id: '66805e72856777001bb1eadc',
    owner: {
      name: 'AvatariusXX',
      email: 'avatarius93@gmail.com',
      createdAt: '2024-06-12T16:36:55.798Z',
      updatedAt: '2024-06-16T22:58:44.303Z'
    },
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2024-06-29T19:20:18.271Z',
    updatedAt: '2024-06-29T19:20:18.689Z',
    number: 44675,
    price: 1679
  }
};

const userCurrently = {
  email: 'derek.gaming744@gmail.com',
  name: 'DreamHarakiri'
};

const userUpdated = {
  email: 'derek.gaming@gmail.com',
  name: 'test'
};

export {
  burgerFullState,
  newIngredient,
  newBun,
  burgerAfterDeleteState,
  burgerAfterReorderState,
  feedFullState,
  ingredientsFullState,
  orderList,
  currentOrder,
  newOrder,
  userCurrently,
  userUpdated
};
