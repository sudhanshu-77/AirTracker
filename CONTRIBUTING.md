# Contributing to AirTracker

Thank you for your interest in contributing to AirTracker! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide screenshots or error messages when applicable
- Check existing issues before creating a new one

### Suggesting Features
- Open an issue with the "feature request" label
- Clearly describe the feature and its benefits
- Provide mockups or examples if possible

### Code Contributions

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/AirTracker.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use CSS custom properties for theme values

### File Organization
- Group related components in folders
- Use PascalCase for component files
- Use camelCase for utility functions
- Keep components small and focused

## 🧪 Testing

- Write unit tests for utility functions
- Add integration tests for complex features
- Test responsive design on multiple devices
- Verify PWA functionality

## 📚 Documentation

- Update README.md for new features
- Add inline code comments
- Update API documentation
- Include examples in documentation

## 🚀 Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages are descriptive
- [ ] No console.log statements in production code
- [ ] Responsive design is maintained
- [ ] Accessibility standards are followed

## 🏷️ Commit Message Format

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🎯 Priority Areas

We especially welcome contributions in:

- Real API integrations
- Performance optimizations
- Accessibility improvements
- Mobile experience enhancements
- Test coverage improvements
- Documentation updates

## 📞 Getting Help

- Join our discussions in GitHub Issues
- Check existing documentation
- Review similar implementations in the codebase

## 📄 License

By contributing to AirTracker, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to AirTracker! 🛫