import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/theme.dart';
import '../../../l10n/app_localizations.dart';

/// Registro de una empresa NUEVA -- siempre se completa en ocaruta.com, nunca
/// en la app. Antes esta pantalla tenía un formulario completo (nombre,
/// email, contraseña, plan) que llamaba a POST /planes/registro -- pero ese
/// endpoint SIEMPRE exige un método de pago de Stripe para arrancar la
/// prueba gratis de 7 días, y la app nunca capturó tarjeta (no se puede:
/// la política de Play exige Google Play Billing para pagos dentro de la
/// app, no Stripe directo). El resultado real era que cualquiera que
/// llenaba el formulario completo recibía un error al final pidiéndole
/// que fuera al sitio web -- se cambió a avisar esto ANTES de pedir datos,
/// no después.
class RegistroNegocioScreen extends StatelessWidget {
  const RegistroNegocioScreen({super.key});

  Future<void> _abrirRegistroWeb() async {
    final uri = Uri.parse('https://ocaruta.com/registro');
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(l10n.registrarMiNegocio)),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.business_center_outlined, size: 56, color: AppTheme.primary),
              const SizedBox(height: 20),
              Text(
                l10n.registroNegocioSoloWebTitulo,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 10),
              Text(
                l10n.registroNegocioSoloWebTexto,
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: Colors.grey.shade600, height: 1.4),
              ),
              const SizedBox(height: 28),
              ElevatedButton.icon(
                onPressed: _abrirRegistroWeb,
                icon: const Icon(Icons.open_in_new, size: 18),
                label: Text(l10n.abrirOcaRutaCom),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () => context.go('/login'),
                child: Text(l10n.yaTengoCuentaIniciarSesion),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
