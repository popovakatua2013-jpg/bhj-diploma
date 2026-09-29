/**
 * Класс Transaction для управления доходами и расходами.
 * Наследуется от Entity.
 * */
class Transaction extends Entity {
  static get URL() {
    return '/transaction';
  }
}