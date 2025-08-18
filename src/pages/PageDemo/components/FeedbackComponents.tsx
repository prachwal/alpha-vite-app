import { useState } from 'preact/hooks';
import { Alert } from '../../../components/feedback/Alert/Alert';
import { Modal } from '../../../components/feedback/Modal/Modal';
import { Dialog } from '../../../components/feedback/Dialog/Dialog';
import { Tooltip } from '../../../components/feedback/Tooltip/Tooltip';
import { Loading } from '../../../components/feedback/Loading/Loading';
import { Button } from '../../../components/form/Button/Button';
import { Input } from '../../../components/form/Input/Input';

export function FeedbackComponents() {
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">
        Komponenty Informacji Zwrotnej
      </h2>

      <div>
        <h3 className="text-lg font-semibold mb-3">Alert - Alerty</h3>
        <div className="space-y-4">
          {alertVisible && (
            <Alert
              variant="info"
              title="Informacja"
              description="To jest przykład alertu informacyjnego"
              closable
              onClose={() => setAlertVisible(false)}
            />
          )}
          <Alert
            variant="success"
            title="Sukces"
            description="Operacja została wykonana pomyślnie"
          />
          <Alert
            variant="warning"
            title="Ostrzeżenie"
            description="Uwaga na potencjalne problemy"
          />
          <Alert
            variant="error"
            title="Błąd"
            description="Wystąpił błąd podczas wykonywania operacji"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Loading - Ładowanie</h3>
        <div className="flex gap-4 items-center">
          <Loading variant="spinner" size="sm" />
          <Loading variant="dots" size="md" />
          <Loading variant="pulse" size="lg" />
          <Loading variant="spinner" label="Ładowanie danych..." />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Tooltip - Podpowiedzi</h3>
        <div className="flex gap-4">
          <Tooltip content="To jest podstawowa podpowiedź">
            <Button variant="primary">Hover na mnie</Button>
          </Tooltip>
          <Tooltip content="Podpowiedź z góry" position="top">
            <Button variant="secondary">Góra</Button>
          </Tooltip>
          <Tooltip content="Podpowiedź z lewej strony" position="left">
            <Button variant="secondary">Lewo</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Modal & Dialog</h3>
        <div className="flex gap-4">
          <Button onClick={() => setShowModal(true)}>Otwórz Modal</Button>
          <Button variant="secondary" onClick={() => setShowDialog(true)}>
            Otwórz Dialog
          </Button>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Przykład Modala"
          size="md"
        >
          <div className="p-4">
            <p>To jest zawartość modala. Możesz dodać dowolną zawartość.</p>
            <div className="mt-4">
              <Input
                value={inputValue}
                onChange={setInputValue}
                placeholder="Wprowadź tekst..."
                label="Przykładowe pole"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Anuluj
              </Button>
              <Button onClick={() => setShowModal(false)}>Zapisz</Button>
            </div>
          </div>
        </Modal>

        <Dialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={() => {
            alert('Potwierdzono!');
            setShowDialog(false);
          }}
          title="Potwierdzenie"
          message="Czy jesteś pewien, że chcesz wykonać tę operację?"
          confirmText="Tak, wykonaj"
          cancelText="Anuluj"
          variant="info"
        />
      </div>
    </section>
  );
}
