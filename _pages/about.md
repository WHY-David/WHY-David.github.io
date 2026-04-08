---
permalink: /
title: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I am a Ph.D. student in Quantum Science and Engineering at Princeton University. My research is centered on quantum information theory and quantum many-body dynamics, with additional interests in quantum algorithms, open quantum systems, and physics-inspired machine learning theory.

[Email](mailto:hywang@princeton.edu) | [Google Scholar](https://scholar.google.com/citations?hl=en&user=wfOpRZcAAAAJ) | [arXiv](https://arxiv.org/a/wang_h_17.html) | [GitHub](https://github.com/WHY-David) | [LinkedIn](https://www.linkedin.com/in/hong-yi-wang-5bb7a9292/) | [ORCID](https://orcid.org/0000-0002-2856-3265)

## Research

I work on problems at the interface of quantum information, condensed matter theory, and nonequilibrium many-body physics. Recent projects have focused on non-Hermitian quantum systems, non-Bloch band theory, parity-time symmetry breaking, and the role of geometry in open-system dynamics. More broadly, I am interested in entanglement and complexity in many-body systems, randomized quantum evolution, and theoretical questions that connect quantum science to modern machine learning.

## Publications

<div class="home-section-list">
{% assign publications = site.publications | sort: "date" | reverse %}
{% for post in publications %}
  {% include archive-single.html %}
{% endfor %}
</div>

## Talks and Presentations

<div class="home-section-list">
{% assign talks = site.talks | sort: "order" %}
{% for post in talks %}
  {% include archive-single-talk.html %}
{% endfor %}
</div>

## Background

- Princeton University, Ph.D. in Quantum Science and Engineering, 2024-present.
- Stanford University, Visiting Student Researcher, 2023-2024, working with Prof. Xiao-Liang Qi at the Stanford Institute for Theoretical Physics.
- Tsinghua University, Ph.D. program in Physics, 2021-2024, advised by Prof. Zhong Wang at the Institute for Advanced Study.
- Peking University, B.Sc. in Physics, 2017-2021.
- The High School Affiliated to Renmin University of China, Asian Physics Olympiad Gold Medalist in 2017.

My recent research experience includes non-Hermitian quantum systems and topology, especially the skin effect in two and higher dimensions, the interplay between parity-time symmetry and exceptional points, and related experimental collaborations. I have also worked on many-body dynamics and entanglement phenomena, including randomized quantum evolution, operator growth, and quantum-information perspectives on quantum gravity.
