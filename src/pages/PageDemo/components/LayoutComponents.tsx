import { Container } from "../../../components/layout/Container/Container";
import { Stack } from "../../../components/layout/Stack/Stack";
import { Divider } from "../../../components/layout/Divider/Divider";
import { Grid } from "../../../components/layout/Grid/Grid";

export function LayoutComponents() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">Komponenty Layoutu</h2>

      <div>
        <h3 className="text-lg font-semibold mb-3">Container - Kontener</h3>
        <Container
          maxWidth="md"
          className="bg-blue-50 dark:bg-blue-900 border rounded"
        >
          <div className="p-4">
            <p>To jest zawartość kontenera o maksymalnej szerokości 'md'</p>
          </div>
        </Container>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Stack - Stos elementów</h3>
        <Stack direction="row" spacing="lg" justify="center" align="center">
          <div className="p-3 bg-blue-500 text-white rounded">Element 1</div>
          <div className="p-3 bg-green-500 text-white rounded">Element 2</div>
          <div className="p-3 bg-purple-500 text-white rounded">Element 3</div>
        </Stack>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Divider - Separator</h3>
        <div className="space-y-4">
          <div>Tekst przed separatorem</div>
          <Divider />
          <div>Tekst po separatorze</div>
          <Divider orientation="horizontal" thickness="thick" color="dark" />
          <div>Separator z niestandardowym kolorem i grubością</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Grid - Siatka</h3>
        <Grid columns={3} gap="lg" className="mt-4">
          <div className="p-4 bg-red-100 dark:bg-red-900 rounded">
            Grid Item 1
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
            Grid Item 2
          </div>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
            Grid Item 3
          </div>
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
            Grid Item 4
          </div>
          <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded">
            Grid Item 5
          </div>
          <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded">
            Grid Item 6
          </div>
        </Grid>
      </div>
    </section>
  );
}
