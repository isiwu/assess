import { getData } from './load/pause'
import Switch from './switch'

export default async function Home() {
  const data = await getData()
  return (
    <div>
      <Switch />
    </div>
  )
}
