App.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";

import { postsData } from "../mock/mock-data";

import { Post } from "../shared/components/molecules/Post/Post";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="flex flex-col justify-center items-center h-dvh bg-[#f0f2f5]">
      <h1 className="text-2xl font-bold mb-12">News List</h1>

      <ul className="flex flex-col gap-4 border-2 p-4 rounded-md">
        {postsData.map((post) => (
          <li key={post.id}>
            <Post {...post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
```

3\. Що буде при видаленні key: React не буде розуміти який саме елемент змінився та буде або перемальовувати весь список, або неправильно видаляти елементи зі списка, тому ДУЖЕ важливо ніколи не використувати в якості ключей позицію елемента в масиві, а краще незмінний зовнішній ID

4.1. Навіщо потрібен проп key у списках React? (Відповідь повязана з ідентифікацією елементів при Reconciliation). Для того щоб React чітко знав з якими компонентами треба працювати, щоб кожен раз не ререндерити абсолютно весь список.
4.2. Чому не рекомендується використовувати індекс масиву (index) як ключ? (Це може призвести до помилок при зміні порядку елементів або їх видаленні). Тому що індекс не є детермінованим значенням і може змінюватись шляхом переміщування елементів або заміни їх на інші, через що React може не оновити список або ще щось.
Але є виключення це коли ми знаємо що список НІКОЛИ не зміниться(Але цього знати не може ніхто), в такому разі можно(АЛЕ не рекомендується)

4.3. У чому різниця між імперативним створенням списку (цикл for) та

декларативним (map)? Імперативний спосіб не є рекомендованим так як треба писати більше непотрібного коду, і він не відповідає стандартам функціонального програмування, в свою чергу метод map є яскравим прикладом функціонального програмування, при одних і тих же вхідних даних ми отримуємо один і той же результат, сказка просто.

4.4. Як передати всі властивості обєкта в компонент одним рядком? (Spread attributes: {...item}).

```tsx
type User = {
    id: number;
    name: string;
}

const mockUser: User = {
    id: 0;
    name: "Bebra"
}

const ShowUser: FC<User> = ({id, name}) => {return <div>{id}:{name}</div>}

const Main: FC = () => {return <ShowUser {...mockUser} />}
```
